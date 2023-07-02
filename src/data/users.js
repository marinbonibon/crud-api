import crypto from 'crypto';

export const users = [
  {
    'id': crypto.randomUUID(),
    'username': 'Bob',
    'age': 30,
    'hobbies': ['swimming']
  },
  {
    'id': crypto.randomUUID(),
    'username': 'Clara',
    'age': 20,
    'hobbies': []
  }
]
