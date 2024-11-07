-- CreateTable
CREATE TABLE "CustomerVendor" (
    "id" SERIAL NOT NULL,
    "companyType" TEXT NOT NULL,
    "gstin" TEXT,
    "companyName" TEXT NOT NULL,
    "contactPerson" TEXT,
    "contactNo" TEXT,
    "email" TEXT,
    "registrationType" TEXT,
    "pan" TEXT,
    "distanceForEwayBill" DOUBLE PRECISION,
    "enable" BOOLEAN NOT NULL,
    "billingAddressId" INTEGER NOT NULL,
    "addressId" INTEGER,
    "balanceId" INTEGER NOT NULL,
    "customFieldId" INTEGER,
    "additionalDetailId" INTEGER,

    CONSTRAINT "CustomerVendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "address1" TEXT,
    "address2" TEXT,
    "landmark" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "state" TEXT NOT NULL,
    "pincode" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" SERIAL NOT NULL,
    "customerBalance" DOUBLE PRECISION,
    "vendorBalance" DOUBLE PRECISION,
    "balanceType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankDetail" (
    "id" SERIAL NOT NULL,
    "bankName" TEXT,
    "bankIfscCode" TEXT,
    "bankAccountNumber" TEXT,
    "bankBranchName" TEXT,

    CONSTRAINT "BankDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomField" (
    "id" SERIAL NOT NULL,
    "licenseNo" TEXT,

    CONSTRAINT "CustomField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalDetail" (
    "id" SERIAL NOT NULL,
    "faxNo" TEXT,
    "website" TEXT,
    "dueDays" INTEGER,
    "note" TEXT,

    CONSTRAINT "AdditionalDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerVendor" ADD CONSTRAINT "CustomerVendor_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerVendor" ADD CONSTRAINT "CustomerVendor_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerVendor" ADD CONSTRAINT "CustomerVendor_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerVendor" ADD CONSTRAINT "CustomerVendor_customFieldId_fkey" FOREIGN KEY ("customFieldId") REFERENCES "CustomField"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerVendor" ADD CONSTRAINT "CustomerVendor_additionalDetailId_fkey" FOREIGN KEY ("additionalDetailId") REFERENCES "AdditionalDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
