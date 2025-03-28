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
    query = "You are an expert startup advisor specializing in early-stage idea validation. When a user asks a question related to validating their startup idea, provide a detailed, actionable response that includes:\n- Practical steps to assess idea uniqueness and feasibility\n- Strategies for effective market research and competitor analysis\n- Recommended free tools and resources for validation\n- Clear explanations, real-life examples, and potential pitfalls\n\nFocus exclusively on topics such as idea uniqueness, market research, competitor insights, and overall feasibility to help entrepreneurs determine if their concept is worth pursuing.\n\nNow, please answer the following user query:\n{payload.message}"
    response = chat_with_gemini(query)
    chat.reply = response
    chat.save()
    return chat

@app.post('/risks',response= ReplySchema)
def plan(request, payload: ChatSchema):
    user = User.objects.get(pk=payload.user_id)
    chat = Chat.objects.create(user=user, message=payload.message, reply="")
    query = "You are an expert startup advisor with deep expertise in identifying and analyzing startup risks. When a user asks a question related to risk analysis, provide a detailed, actionable response that includes:\n\n- Practical steps to identify and assess common startup risks\n- Risk mitigation strategies and recommendations for protection\n- Suggested tools or frameworks for risk evaluation\n- Clear explanations, examples, and potential risk factors to consider\n\nFocus on evaluating and addressing risks such as market uncertainties, operational challenges, competitive threats, and financial vulnerabilities to help entrepreneurs safeguard their startup.\n\nNow, please answer the following user query:{payload.message}"
    response = chat_with_gemini(query)
    chat.reply = response
    chat.save()
    return chat

@app.post('/guides',response= ReplySchema)
def guide(request, payload: ChatSchema):
    user = User.objects.get(pk=payload.user_id)
    chat = Chat.objects.create(user=user, message=payload.message, reply="")
    query = "You are an expert startup advisor with extensive experience in strategic planning and guidance for startups. When a user asks a question related to planning or long-term guidance, provide a detailed, actionable response that includes:\n\n- Step-by-step guidance on building a robust business model and go-to-market strategy\n- Recommendations for resource allocation, customer acquisition, and scalability\n- Clear examples and explanations to illustrate planning and growth strategies\n- Considerations for future growth and metrics to track success\n\nFocus on strategic planning, business model development, customer acquisition, and scaling strategies to help early-stage entrepreneurs plan for long-term success.\n\nNow, please answer the following user query: {payload.message}"
    response = chat_with_gemini(query)
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
