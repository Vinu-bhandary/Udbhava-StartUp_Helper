from ninja import NinjaAPI
from .models import Chat, User
from .views import chat_with_gemini
from .schemas import ChatSchema, UserSchema, ReplySchema, UserDataSchema, ChatHistorySchema
from typing import List

app = NinjaAPI()


@app.get('/login',response= {200: UserSchema, 400: bool})
def login(request, email: str, password: str):
    user = User.objects.filter(email=email, password=password).first()
    if user:
        return {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    
    return 400, False

@app.post('/register',response= UserSchema)
def register(request, payload: UserDataSchema):
    user = User.objects.create(**payload.dict())
    return user

@app.post('/validate',response= ReplySchema)
def validate(request, payload: ChatSchema):
    user = User.objects.get(pk=payload.user_id)
    chat = Chat.objects.create(user=user, message=payload.message, reply="")
    response = chat_with_gemini(payload.message)
    chat.reply = response
    chat.save()
    return chat

@app.post('/plan',response= ReplySchema)
def plan(request, payload: ChatSchema):
    user = User.objects.get(pk=payload.user_id)
    chat = Chat.objects.create(user=user, message=payload.message, reply="")
    response = chat_with_gemini(payload.message)
    chat.reply = response
    chat.save()
    return chat

@app.post('guides',response= ReplySchema)
def guide(request, payload: ChatSchema):
    user = User.objects.get(pk=payload.user_id)
    chat = Chat.objects.create(user=user, message=payload.message, reply="")
    response = chat_with_gemini(payload.message)
    chat.reply = response
    chat.save()
    return chat



@app.get('/history',response=List[ChatHistorySchema])
def history(request, user_id: int):
    user = User.objects.get(pk=user_id)
    chats = Chat.objects.filter(user=user).order_by('timestamp')
    if chats:
        return chats
    return []
