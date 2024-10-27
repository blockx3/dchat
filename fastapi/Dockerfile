FROM python:3.10

WORKDIR /app/fastapi

COPY ./requirements.txt /app/fastapi/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/fastapi/requirements.txt

COPY . /app/fastapi/

CMD ["python", "main.py"]