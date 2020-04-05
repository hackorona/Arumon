import datetime
import json
import boto3

from decimal import Decimal
from boto3.dynamodb.conditions import Key


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            if abs(o) % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


def lambda_handler(event, context):
    """Get density data of restaurants from Dynamodb.

    Parameters
    ----------
    event: dict, required

    context: object, required

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

    """

    req_store_code = event.get("store_id")
    req_date = event.get("date")

    if not req_date:
        req_date = datetime.datetime.today().strftime("%Y%m%d")

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('bentogo-density')

    response = table.query(
        KeyConditionExpression=Key('store-id').eq(str(req_store_code)) & Key('date').eq(str(req_date))
    )

    items = response.get('Items')

    # TODO:
    # 1. from, toで返す
    # 2. fromでソートする

    return {
        "statusCode": 200,
         'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
        },
        "body": json.dumps(items, default=DecimalEncoder().default)
    }
