import pandas as pd

f_name = 'data_tmp.csv'

df3 = pd.dataframe({'순위': [1, 2, 3, 4]})
df3.to_csv('test.csv', index=False)