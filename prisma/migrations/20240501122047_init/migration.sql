-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "OrderContent" (
    "order_content_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "guard_count" INTEGER NOT NULL,
    "with_weapon" BOOLEAN NOT NULL,
    "with_car" BOOLEAN NOT NULL,
    "with_bike" BOOLEAN NOT NULL,

    CONSTRAINT "OrderContent_pkey" PRIMARY KEY ("order_content_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderContent" ADD CONSTRAINT "OrderContent_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
