import hashlib

password = "8Ka-YVi-R6z-iAs"
hash_value = hashlib.sha256(password.encode()).hexdigest()
print(f"Password: {password}")
print(f"SHA256: {hash_value}")