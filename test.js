const { MongoClient } = require('mongodb');

// MongoDB 연결 문자열 (사용자 제공)mongodb+srv://amdin:123@cluster0.4pwjx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const uri = "";

async function connectMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // MongoDB 연결 시도
        await client.connect();
        console.log("✅ MongoDB 연결 성공!");

        // 데이터베이스 및 컬렉션 선택
        const db = client.db("mtboard"); // 사용할 데이터베이스 이름
        const collection = db.collection("post"); // 사용할 컬렉션 이름

        // 샘플 데이터 삽입
        // const sampleData = { name: "테스트 사용자", age: 30, createdAt: new Date() };
        // const result = await collection.insertOne(sampleData);
        // console.log("✅ 데이터 삽입 성공! 삽입된 ID:", result.insertedId);

        // 삽입된 데이터 조회
        const docs = await collection.find().toArray();
        console.log("📌 현재 컬렉션 데이터:", docs);

    } catch (error) {
        console.error("❌ MongoDB 연결 오류:", error);
    } finally {
        // 연결 종료
        await client.close();
        console.log("🔌 MongoDB 연결 종료");
    }
}

// 실행
connectMongoDB();
