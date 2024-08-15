const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: [{ completed: "asc" }, { createdAt: "desc" }],
    });
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch tasks", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title } = await req.json();

    if (!title) {
      return new Response("Title is required", { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: { title },
    });
    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    return new Response("Failed to create task", { status: 400 });
  }
}
