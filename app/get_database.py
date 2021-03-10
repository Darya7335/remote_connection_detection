import json, csv, pandas


def add_to_json(data, file_name):
    with open(file_name, "w") as write_file:
        json.dump(data, write_file)


def save_user(user_name, file_name):
    my_file = open(file_name, "w")
    my_file.write(user_name)
    my_file.close()


def read_file(path_to_file):
    my_file = open(path_to_file)
    my_string = my_file.read()
    my_file.close()
    return (my_string)


def add_to_csv(data, file_name):
    with open(file_name, "a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(data)


def read_last_string_csv(file_name):
    with open(file_name, 'r') as f:
        file = f.readlines()
        user_id = file[-1].split(',')[0]
        session = file[-1].split(',')[1][:-1]
    return user_id, session
