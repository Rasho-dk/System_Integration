# import datetime
from datetime import datetime

current_date = datetime.now()
print(current_date)


print(current_date.strftime('%Y-%m-%dT%H:%M:%S'))



# nodemon --exec python3 main.py