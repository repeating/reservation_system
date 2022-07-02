FROM python:3.9

WORKDIR .

COPY . .

RUN pip install -r requirements.txt
RUN python test_api.py
RUN rm dev.db
RUN flask db init
RUN flask db migrate
RUN flask db upgrade

EXPOSE 5000

CMD python app.py seed
