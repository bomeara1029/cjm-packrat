-- 2021-05-12 Jon
UPDATE Model SET MASTER = 0 WHERE MASTER = 1 AND idVPurpose <> 45;
UPDATE Model SET idVPurpose = 46 WHERE MASTER = 0 AND idVPurpose = 45;
ALTER TABLE Model DROP COLUMN `Master`;

ALTER TABLE Metadata MODIFY COLUMN `ValueExtended` longtext DEFAULT NULL;

CREATE TABLE IF NOT EXISTS `SystemObjectVersionAssetVersionXref` (
  `idSystemObjectVersionAssetVersionXref` int(11) NOT NULL AUTO_INCREMENT,
  `idSystemObjectVersion` int(11) NOT NULL,
  `idAssetVersion` int(11) NOT NULL,
  PRIMARY KEY (`idSystemObjectVersionAssetVersionXref`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

ALTER TABLE `SystemObjectVersionAssetVersionXref`
ADD CONSTRAINT `fk_systemobjectversionassetversionxref_systemobjectversion`
  FOREIGN KEY (`idSystemObjectVersion`)
  REFERENCES `SystemObjectVersion` (`idSystemObjectVersion`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_systemobjectversionassetversionxref_assetversion`
  FOREIGN KEY (`idAssetVersion`)
  REFERENCES `AssetVersion` (`idAssetVersion`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

-- 2021-05-18 Jon
ALTER TABLE Model ADD COLUMN `IsDracoCompressed` boolean NULL;
ALTER TABLE SystemObjectVersion ADD COLUMN `DateCreated` datetime NOT NULL;

-- 2021-05-26 Jon
ALTER TABLE Model MODIFY COLUMN `idVCreationMethod` int(11) NULL;
ALTER TABLE Model MODIFY COLUMN `idVModality` int(11) NULL;
ALTER TABLE Model MODIFY COLUMN `idVUnits` int(11) NULL;
ALTER TABLE Model MODIFY COLUMN `idVPurpose` int(11) NULL;
ALTER TABLE Model MODIFY COLUMN `idVFileType` int(11) NULL;

-- 2021-06-01 Jon
ALTER TABLE Model DROP COLUMN Authoritative;
UPDATE Vocabulary SET Term = 'Download' WHERE Term = 'Print Delivery';

-- 2021-06-02 Jon
SELECT idVocabulary INTO @idVocabARK FROM Vocabulary 
WHERE Term = 'ARK' AND idVocabularySet = (SELECT idVocabularySet FROM VocabularySet WHERE NAME = 'Identifier.IdentifierType');
SELECT idVocabulary INTO @idVocabCMSUnitID FROM Vocabulary 
WHERE Term = 'Unit CMS ID' AND idVocabularySet = (SELECT idVocabularySet FROM VocabularySet WHERE NAME = 'Identifier.IdentifierType');

INSERT INTO Identifier (IdentifierValue, idVIdentifierType, idSystemObject) SELECT 'ITEM_GUID_4', @idVocabARK, idSystemObject FROM SystemObject WHERE idItem = (SELECT idItem FROM Item WHERE NAME = 'NMAH Baseball Bat');

-- 2021-06-05 Jon
ALTER TABLE Model ADD COLUMN AutomationTag varchar(256) NULL;

-- 2021-06-06 Deployed to Staging

-- 2021-07-01 Jon
ALTER TABLE License ADD COLUMN RestrictLevel int(11) NOT NULL;
INSERT INTO License (Name, Description, RestrictLevel) VALUES ('View And Download CC0', 'View And Download CC0', 10);
INSERT INTO License (Name, Description, RestrictLevel) VALUES ('View with Download Restrictions', 'View with Download Restrictions', 20);
INSERT INTO License (Name, Description, RestrictLevel) VALUES ('View Only', 'View Only', 30);
INSERT INTO License (Name, Description, RestrictLevel) VALUES ('Restricted', 'Restricted', 1000);

-- 2021-07-13 Jon
CREATE TABLE IF NOT EXISTS `WorkflowReport` (
  `idWorkflowReport` int(11) NOT NULL AUTO_INCREMENT,
  `idWorkflow` int(11) NOT NULL,
  `MimeType` varchar(256) NOT NULL,
  `Data` longtext NOT NULL,
  PRIMARY KEY (`idWorkflowReport`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

ALTER TABLE `WorkflowReport` 
ADD CONSTRAINT `fk_workflowreport_workflow1`
  FOREIGN KEY (`idWorkflow`)
  REFERENCES `Workflow` (`idWorkflow`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

-- 2021-07-16 Jon
CREATE TABLE IF NOT EXISTS `WorkflowSet` (
  `idWorkflowSet` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idWorkflowSet`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

ALTER TABLE Workflow ADD COLUMN idWorkflowSet int(11) DEFAULT NULL;

ALTER TABLE `Workflow` 
ADD CONSTRAINT `fk_workflow_workflowset1`
  FOREIGN KEY (`idWorkflowSet`)
  REFERENCES `WorkflowSet` (`idWorkflowSet`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
