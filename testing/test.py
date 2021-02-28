import os
import bankid


from bankid import BankIDJSONClient
client = BankIDJSONClient(certificates=("C:\\Projects\\betting-project\\testing\\certificate.pem",
                                            "C:\\Projects\\betting-project\\testing\key.pem"),
                                            test_server=True)

x = client.authenticate(end_user_ip='5.240.33.51',
                        personal_number="197306201646")


print(x)
