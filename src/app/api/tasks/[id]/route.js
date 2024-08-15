const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const id = parseInt(params.id);
    console.log(id);

    const task = await prisma.task.findUnique({
      where: { id },
    });
    console.log(task);

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response("Task not found", { status: 404 });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = parseInt(params.id);
    console.log(id);

    const { title, completed } = await req.json();
    console.log(title, completed);

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, completed },
    });
    console.log(updatedTask);

    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (error) {
    return new Response("Failed to update task", { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id);
    console.log(id);

    const deletedTask = await prisma.task.delete({
      where: { id },
    });
    console.log(deletedTask);

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response("Failed to delete task", { status: 400 });
  }
}
