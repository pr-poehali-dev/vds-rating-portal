import hashlib

password = "Iamnottrue057"
password_bytes = password.encode('utf-8')
hash_value = hashlib.sha256(password_bytes).hexdigest()

print(f"Password: '{password}'")
print(f"Length: {len(password)} chars")
print(f"Bytes: {password_bytes}")
print(f"SHA256 hash: {hash_value}")