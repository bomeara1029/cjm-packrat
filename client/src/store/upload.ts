import create, { SetState, GetState } from 'zustand';
import lodash from 'lodash';
import { toast } from 'react-toastify';
import { eVocabularySetID } from '../types/server';
import { generateFileId } from '../utils/upload';
import { useVocabulary } from './vocabulary';
import { apolloClient, apolloUploader } from '../graphql';
import { DiscardUploadedAssetVersionsDocument, DiscardUploadedAssetVersionsMutation, UploadAssetDocument, UploadAssetMutation, UploadStatus } from '../types/graphql';
import { FetchResult } from '@apollo/client';
import { parseFileId } from './utils';

export type FileId = string;

export enum FileUploadStatus {
    READY = 'READY',
    UPLOADING = 'UPLOADING',
    COMPLETE = 'COMPLETE',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED'
}

export type IngestionFile = {
    id: FileId;
    size: number;
    name: string;
    file: File;
    type: number;
    status: FileUploadStatus;
    progress: number;
    selected: boolean;
    cancel: (() => void) | null;
};

type UploadStore = {
    completed: IngestionFile[];
    pending: IngestionFile[];
    loading: boolean;
    getSelectedFiles: (files: IngestionFile[], selected: boolean) => IngestionFile[];
    loadPending: (acceptedFiles: File[]) => void;
    loadCompleted: (completed: IngestionFile[]) => void;
    selectFile: (id: FileId, selected: boolean) => void;
    startUpload: (id: FileId) => void;
    cancelUpload: (id: FileId) => void;
    retryUpload: (id: FileId) => void;
    removeUpload: (id: FileId) => void;
    startUploadTransfer: (ingestionFile: IngestionFile) => void;
    changeAssetType: (id: FileId, assetType: number) => void;
    discardFiles: () => Promise<void>;
    removeSelectedUploads: () => void;
    reset: () => void;
};

export const useUpload = create<UploadStore>((set: SetState<UploadStore>, get: GetState<UploadStore>) => ({
    completed: [],
    pending: [],
    loading: true,
    getSelectedFiles: (files: IngestionFile[], selected: boolean): IngestionFile[] => lodash.filter(files, file => file.selected === selected),
    loadPending: (acceptedFiles: File[]) => {
        const { pending } = get();

        if (acceptedFiles.length) {
            const ingestionFiles: IngestionFile[] = [];
            acceptedFiles.forEach((file: File): void => {
                const id = generateFileId();
                const alreadyContains = !!lodash.find(pending, { id });

                const { name, size } = file;
                const { getInitialEntry } = useVocabulary.getState();
                const type = getInitialEntry(eVocabularySetID.eAssetAssetType);

                if (!type) {
                    toast.error(`Vocabulary for file ${name} not found`);
                    return;
                }

                if (!alreadyContains) {
                    const ingestionFile = {
                        id,
                        file,
                        name,
                        size,
                        status: FileUploadStatus.READY,
                        progress: 0,
                        type,
                        selected: false,
                        cancel: null
                    };

                    ingestionFiles.push(ingestionFile);
                } else {
                    toast.info(`${file.name} was already loaded`);
                }
            });

            const updatedPendingFiles = lodash.concat(pending, ingestionFiles);
            set({ pending: updatedPendingFiles });
        }
    },
    loadCompleted: (completed: IngestionFile[]): void => {
        set({ completed, loading: false });
    },
    selectFile: (id: FileId, selected: boolean) => {
        const { completed } = get();
        const updatedCompleted = lodash.forEach(completed, file => {
            if (file.id === id) {
                lodash.set(file, 'selected', selected);
            }
        });

        set({ completed: updatedCompleted });
    },
    startUpload: (id: FileId) => {
        const { pending, startUploadTransfer } = get();
        const file = getFile(id, pending);

        if (file) {
            const updatedPending = lodash.forEach(pending, file => {
                if (file.id === id) {
                    lodash.set(file, 'progress', 0);
                    lodash.set(file, 'status', FileUploadStatus.UPLOADING);
                }
            });

            set({ pending: updatedPending });
            startUploadTransfer(file);
        }
    },
    retryUpload: (id: FileId): void => {
        const { pending, startUploadTransfer } = get();
        const file = getFile(id, pending);
        if (file) {
            const updatedPending = lodash.forEach(pending, file => {
                if (file.id === id) {
                    lodash.set(file, 'status', FileUploadStatus.UPLOADING);
                }
            });

            set({ pending: updatedPending });
            startUploadTransfer(file);
        }
    },
    cancelUpload: (id: FileId): void => {
        const { pending } = get();
        const file = getFile(id, pending);

        if (file) {
            if (file.status === FileUploadStatus.UPLOADING) {
                const { cancel } = file;
                if (cancel) {
                    cancel();
                    const updatedPending = lodash.forEach(pending, file => {
                        if (file.id === id) {
                            lodash.set(file, 'status', FileUploadStatus.CANCELLED);
                        }
                    });
                    set({ pending: updatedPending });
                    toast.warn('Upload has been cancelled');
                }
            }
        }
    },
    removeUpload: (id: FileId): void => {
        const { pending } = get();
        const updatedPending = pending.filter(file => file.id !== id);
        set({ pending: updatedPending });
    },
    startUploadTransfer: async (ingestionFile: IngestionFile) => {
        const { pending } = get();
        const { id, file, type } = ingestionFile;

        try {
            const onProgress = (event: ProgressEvent) => {
                const { loaded, total } = event;
                const progress = Math.floor((loaded / total) * 100);
                const updateProgress = !(progress % 5);

                if (updateProgress) {
                    const updatedPendingProgress = lodash.forEach(pending, file => {
                        if (file.id === id) {
                            lodash.set(file, 'progress', progress);
                        }
                    });
                    set({ pending: updatedPendingProgress });
                }
            };

            const onCancel = (cancel: () => void) => {
                const updatedPendingProgress = lodash.forEach(pending, file => {
                    if (file.id === id) {
                        lodash.set(file, 'cancel', cancel);
                    }
                });
                set({ pending: updatedPendingProgress });
            };

            const { data } = await apolloUploader({
                mutation: UploadAssetDocument,
                variables: { file, type },
                refetchQueries: ['getUploadedAssetVersion'],
                useUpload: true,
                onProgress,
                onCancel
            });

            const { uploadAsset }: UploadAssetMutation = data;

            if (uploadAsset) {
                const { status, error } = uploadAsset;

                if (status === UploadStatus.Complete) {
                    const updatedPending = pending.filter(file => file.id !== id);
                    set({ pending: updatedPending });
                    toast.success(`Upload finished for ${file.name}`);
                } else if (status === UploadStatus.Failed) {
                    const errorMessage = error || `Upload failed for ${file.name}`;
                    toast.error(errorMessage);
                    const updatedPending = lodash.forEach(pending, file => {
                        if (file.id === id) {
                            lodash.set(file, 'status', FileUploadStatus.FAILED);
                        }
                    });
                    set({ pending: updatedPending });
                }
            }
        } catch ({ message }) {
            const file = getFile(id, pending);

            if (file) {
                if (file.status !== FileUploadStatus.CANCELLED) {
                    const updatedPending = lodash.forEach(pending, file => {
                        if (file.id === id) {
                            lodash.set(file, 'status', FileUploadStatus.FAILED);
                        }
                    });
                    set({ pending: updatedPending });
                }
            }
        }
    },
    changeAssetType: (id: FileId, assetType: number): void => {
        const { pending } = get();
        const updatedPending = lodash.forEach(pending, file => {
            if (file.id === id) {
                lodash.set(file, 'type', assetType);
            }
        });
        set({ pending: updatedPending });
    },
    discardFiles: async (): Promise<void> => {
        const { completed, getSelectedFiles } = get();
        const selectedFiles = getSelectedFiles(completed, true);

        if (!selectedFiles.length) {
            toast.warn('Please select at least 1 file to discard');
            return;
        }

        const isConfirmed = global.confirm('Do you want to discard selected items?');

        if (!isConfirmed) return;

        const idAssetVersions: number[] = selectedFiles.map(({ id }) => parseFileId(id));

        const discardMutationVariables = {
            input: {
                idAssetVersions
            }
        };

        try {
            const { data }: FetchResult<DiscardUploadedAssetVersionsMutation> = await apolloClient.mutate({
                mutation: DiscardUploadedAssetVersionsDocument,
                variables: discardMutationVariables
            });

            if (data) {
                const { discardUploadedAssetVersions } = data;
                const { success } = discardUploadedAssetVersions;

                if (!success) {
                    toast.error('Failed to discard selected files');
                    return;
                }

                const updatedCompleted = getSelectedFiles(completed, false);
                set({ completed: updatedCompleted });

                toast.info('Selected files have been discarded');
                return;
            }
        } catch {
            toast.error('Failed to discard selected files');
        }
    },
    removeSelectedUploads: (): void => {
        const { completed } = get();
        const updatedCompleted = completed.filter(({ selected }) => !selected);
        set({ completed: updatedCompleted });
    },
    reset: (): void => {
        const { completed } = get();
        const unselectFiles = (file: IngestionFile): IngestionFile => ({
            ...file,
            selected: false
        });

        const updatedCompleted: IngestionFile[] = completed.map(unselectFiles);
        set({ completed: updatedCompleted, loading: false });
    }
}));

const getFile = (id: FileId, files: IngestionFile[]) => lodash.find(files, { id });
