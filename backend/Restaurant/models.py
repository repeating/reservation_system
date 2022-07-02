from database import db
from sqlalchemy.orm import relationship


class Recipe(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<Recipe {self.title} >"


    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Reservations(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    num_of_people = db.Column(db.Integer(), nullable=False)
    table_num = db.Column(db.Integer(), nullable=False)
    time = db.Column(db.DateTime())
    user_id = db.Column(
        db.Integer(),
        db.ForeignKey('user.id', ondelete='CASCADE'),
        nullable=False,
    )
    user = relationship('User', backref='reservations')
    
    def __repr__(self):
        return f"<Reservation {self.id} >"


    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
