import requests
from Restaurant.models import Recipe


class Seeder:
    def seed(self):
        url = "https://www.fakerestapi.com/datasets/api/v1/clean-recipes-dataset.json"
        response = requests.request("GET", url)
        data = response.json()['data'][:20]
        for item in data:
            recipe = Recipe()
            recipe.title = item['title']
            recipe.description = ",".join(item["ingredients"])
            recipe.save()