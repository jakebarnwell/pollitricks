
import csv

def get_voting_data(load_file=None):
	data = {}
	if load_file is not None:
		header = None
		with open(load_file, 'rb') as csvfile:
			reader = csv.reader(csvfile, delimiter=',')
			for row in reader:
				if header is None:
					header = row
				else:
					for h in range(len(header)):
						data[header[h]] = row[h]
		return data
	else:
		raise Exception

