import os
import bankid
dir_to_save_cert_and_key_in = os.path.expanduser('~')
cert_and_key = bankid.create_bankid_test_server_cert_and_key(
    dir_to_save_cert_and_key_in)


print(cert_and_key)
