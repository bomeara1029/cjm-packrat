# This script is used to cleanup dangaling <none> images after build
# usage: ./scripts/cleanup.sh
sudo docker rmi $(sudo docker images -f "dangling=true" -q)