# df3 = pd.datafrane({순위, 어쩌고, 어쩌고})

import os
import pandas as pd

f_path = 'drive/MyDrive/katalk_data_analysis/'
f_name = "data_tmp.csv"

df3 = pd.DataFrame({'B': ['a', 'c', 'b', 'd'],
                    'C': [3, 6, 9, 1],
                    'D': ['b', 'b', 'e', 'a']})

df3.to_csv(os.path.join(f_path, f_name), index=False)