import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(_req: Request,
  { params }: {
    params: { storeId: string }
  }
) {
  try {

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const size = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.error('[STORE_GET]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function PATCH(req: Request,
  { params }: {
    params: { storeId: string }
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, homeBillboardId } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is a required field", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId
      },
      data: {
        name,
        homeBillboardId
      }
    })
    return NextResponse.json(store);
  } catch (error) {
    console.error('[STORE_PATCH]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(_req: Request,
  { params }: {
    params: { storeId: string }
  }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.error('[STORE_DELETE]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}