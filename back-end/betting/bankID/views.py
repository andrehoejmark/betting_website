import os
import bankid
from bankid import BankIDJSONClient
from .serializers import BankIDAuthenticationSerializer
from .serializers import BankIDCollectSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from betting.settings import BASE_DIR
from ipware import get_client_ip

from .models import BankIDAuthentication


""" COMMENTS
    - Not including if the parameters were correct or not etc because it isn't recommended from documentation most likely a security thingie
    - Made a client for each bankID request because I thought if I had a global one it might conflict at some point when multiple users want to use the stored client
"""

class Authenticate(APIView):

    def post(self, request):

        serializer = BankIDAuthenticationSerializer(data=request.data)

        if serializer.is_valid():
            try:
                end_user_ip, is_routable = get_client_ip(request)
                print(end_user_ip)
                personal_number = serializer.data.get('personal_number')
                
                client = BankIDJSONClient(certificates=(os.path.join(BASE_DIR, 'bankID\certificate.pem'),
                                                        os.path.join(BASE_DIR, 'bankID\key.pem')),
                                                        test_server=True)
                
                response = client.authenticate(end_user_ip=end_user_ip,
                                    personal_number=personal_number)

                print(response)

            except bankid.exceptions.AlreadyInProgressError as e:
                return Response({"CODE": "ALREADY_IN_PROGRESS", "Reason": "Failure to create new order due to one already in progress"})

            except bankid.exceptions.CancelledError:
                return Response({"CODE": "CANCELLED", "Reason": "The order was cancelled. The system received a new order for the user." })
            
            except bankid.exceptions.CertificateError:
                return Response({"CODE": "CERTIFICATE_ERR", "Reason": 
                    "This error is returned if: \n \
                        \t1. The user has entered wrong security code too many times in her mobile device. The Mobile BankID cannot be used. \
                        \t2. The users BankID is revoked. \
                        \t3. The users BankID is invalid. "})

            except bankid.exceptions.ClientError:
                return Response({"CODE": "CLIENT_ERR", "Reason": "Internal technical error. It was not possible to create or verify the transaction."})

            except bankid.exceptions.InternalError:
                return Response({"CODE": "INTERNAL_ERROR", "Reason": "Internal technical error in the BankID system."})

            except bankid.exceptions.MaintenanceError:
                return Response({"CODE": "MaintenanceError", "Reason": "MaintenanceError"})

            except bankid.exceptions.RequestTimeoutError:
                return Response({"CODE": "RequestTimeoutError", "Reason": "It took too long time to transmit the request."})

            except bankid.exceptions.UserCancelError:
                return Response({"CODE": "USER_CANCEL", "Reason": "The user decided to cancel the order."})

            except Exception as e:
                return Response({"CODE": "Not Found", "Reason": "Exception not found"})
            
            return Response(response)

        return Response(serializer.errors)


class OrderStatus(APIView):
    
    def post(self, request):
        
        serializer = BankIDCollectSerializer(data=request.data)

        if serializer.is_valid():
            try:
                order_ref = serializer.data.get('order_ref')
                client = BankIDJSONClient(certificates=(os.path.join(BASE_DIR, 'bankID\certificate.pem'),
                                                            os.path.join(BASE_DIR, 'bankID\key.pem')),
                                                            test_server=True)
                order_status = client.collect(order_ref=order_ref)
                print("order_status: " + str(order_status))
                # order_status = {'orderRef': '57bb0666-d2a6-4222-8798-40e2dda101bc', 'status': 'failed', 'hintCode': 'expiredTransaction'}
                
                if order_status:

                    # Create a new object bankID schema
                    if order_status.get('status') == 'complete':
                        
                        order_ref = order_status.get('orderRef')

                        data = order_status.get('completionData')

                        first_name = data.get("user").get("givenName")
                        last_name = data.get("user").get("surname")
                        p_num = data.get("user").get("personalNumber")
                        ip_address = data.get('device').get('ipAddress')
                        signature = data.get('signature')
                        ocspResponse = data.get('ocspResponse')

                        try:

                            b = BankIDAuthentication(order_ref=order_ref,
                                                    type_of_authentication="REG",
                                                    first_name=first_name,
                                                    last_name=last_name,
                                                    p_number=p_num,
                                                    ip_address=ip_address,
                                                    signature=signature,
                                                    ocspResponse=ocspResponse)
                            b.save()

                        except Exception as e:
                            print(e)
                        
                        
                        return Response({"status":"Complete"})

                return Response({"status":"Failed"})

            except bankid.exceptions.AlreadyInProgressError as e:
                return Response({"CODE": "ALREADY_IN_PROGRESS", "Reason": "Failure to create new order due to one already in progress"})
            
            except bankid.exceptions.CancelledError:
                return Response({"CODE": "CANCELLED", "Reason": "The order was cancelled. The system received a new order for the user." })
            
            except bankid.exceptions.CertificateError:
                return Response({"CODE": "CERTIFICATE_ERR", "Reason": 
                    "This error is returned if: \n \
                        \t1. The user has entered wrong security code too many times in her mobile device. The Mobile BankID cannot be used. \
                        \t2. The users BankID is revoked. \
                        \t3. The users BankID is invalid. "})

            except bankid.exceptions.ClientError:
                return Response({"CODE": "CLIENT_ERR", "Reason": "Internal technical error. It was not possible to create or verify the transaction."})

            except bankid.exceptions.InternalError:
                return Response({"CODE": "INTERNAL_ERROR", "Reason": "Internal technical error in the BankID system."})

            except bankid.exceptions.MaintenanceError:
                return Response({"CODE": "MaintenanceError", "Reason": "MaintenanceError"})

            except bankid.exceptions.RequestTimeoutError:
                return Response({"CODE": "RequestTimeoutError", "Reason": "It took too long time to transmit the request."})

            except bankid.exceptions.UserCancelError:
                return Response({"CODE": "USER_CANCEL", "Reason": "The user decided to cancel the order."})

            except Exception as e:
                print(e)
                return Response({"CODE": "Not Found", "Reason": "Exception not found"})

        return Response(serializer.errors)


