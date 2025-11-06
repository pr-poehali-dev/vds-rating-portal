import hashlib

# Хеш который приходит
incoming = "9b22ae5bb88fbc8f4c40b1e98c6f7c0baada7fefc246e45a50d7f031bd3fc378"

# Попробуем разные варианты 11-символьных паролей
passwords = [
    "!@dmin2025!",
    "!@DMIN2025!",
    "@dmin2025!!",
    "admin2025!!",
]

for pwd in passwords:
    h = hashlib.sha256(pwd.encode()).hexdigest()
    print(f"{pwd} ({len(pwd)} chars) -> {h}")
    if h == incoming:
        print(f"  ✓ MATCH!")
