import logging 
import os

def my_log():
    logger=logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)

    log_dic="./logs"
    os.makedirs(log_dic,exist_ok=True)
    filepath=os.path.join(log_dic,'app.log')
    filehandler=logging.FileHandler(filepath,'a')
    filehandler.setLevel(logging.DEBUG)

    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    filehandler.setFormatter(formatter)

    logger.addHandler(filehandler)
    return logger