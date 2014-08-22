# args: input_filename output_filename
import sys

queries = []
 
f = open(sys.argv[1])
for query in iter(f)
    if query.lower() not in queries:
      queries.append(query.lower())
f.close()

queries.sort()

f1 = open(sys.argv[2], 'w+')

for item in queries:
  f1.write("%s" % item)

f1.close()
