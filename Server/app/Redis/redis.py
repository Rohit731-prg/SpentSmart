import redis

redis_client = redis.Redis(host="localhost", port=6379, db=0)

def blackList_token(token_id: str, expiration_time: int = 3600):
    try:
        redis_client.setex(
            name= f"blackList_token:{token_id}",
            time= expiration_time,
            value= "true"
        )
    except Exception as e:
        raise Exception(f"Error blacklisting token: {str(e)}")
    

def is_token_blacklisted(token: str) -> bool:
    try:
        return redis_client.exists(f"blackList_token:{token}") == 1
    except Exception as e:
        raise Exception(f"Error checking token blacklist: {str(e)}")