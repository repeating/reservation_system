import unittest
from app import create_app
from config import TestConfig
from database import db


class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app=create_app(TestConfig)

        self.client=self.app.test_client(self)

        with self.app.app_context():
            db.init_app(self.app)

            db.create_all()

    def test_signup(self):
        signup_response=self.client.post('/auth/signup',
            json={"username":"testuser",
            "email":"testuser@test.com",
            "password":"password"}
        )

        status_code=signup_response.status_code

        self.assertEqual(status_code, 201)

    def test_login(self):
        signup_response=self.client.post('/auth/signup',
            json={"username":"testuser",
            "email":"testuser@test.com",
            "password":"password"}
        )

        login_response=self.client.post(
            'auth/login',
            json={
                "username":"testuser",
                "password":"password"
            }
        )

        status_code=login_response.status_code


        json=login_response.json

        # print(json)


        self.assertEqual(status_code, 200)

    def test_get_all_recipes(self):
        """TEST GETTING ALL RECIPES"""
        signup_response=self.client.post('/auth/signup',
            json={"username":"testuser",
            "email":"testuser@test.com",
            "password":"password"}
        )

        login_response=self.client.post(
            'auth/login',
            json={
                "username":"testuser",
                "password":"password"
            }
        )

        access_token=login_response.json["access_token"]

        response=self.client.get('/restaurant/recipes',
        headers={
                "Authorization":f"Bearer {access_token}"}
        )

        # print(response.json)

        status_code=response.status_code

        self.assertEqual(status_code, 200)

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    unittest.main()