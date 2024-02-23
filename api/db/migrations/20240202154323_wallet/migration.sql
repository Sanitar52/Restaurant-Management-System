-- CreateTable
CREATE TABLE "userWallet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "walletPrivateKey" TEXT NOT NULL,
    "walletPublicKey" TEXT NOT NULL,
    "walletMnemonic" TEXT NOT NULL,
    "walletBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_userId_key" ON "userWallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_walletAddress_key" ON "userWallet"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_walletPrivateKey_key" ON "userWallet"("walletPrivateKey");

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_walletPublicKey_key" ON "userWallet"("walletPublicKey");

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_walletMnemonic_key" ON "userWallet"("walletMnemonic");

-- AddForeignKey
ALTER TABLE "userWallet" ADD CONSTRAINT "userWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
