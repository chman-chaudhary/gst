"use server";

import { prisma } from "@/lib/PrismaClient";

export const AddCustomerVendor = async (newClient) => {
  try {
    const addCustomerVendor = await prisma.customerVendor.create({
      data: {
        companyType: newClient.companyType,
        gstin: newClient.gstin ?? undefined,
        companyName: newClient.companyName,
        contactPerson: newClient.contactPerson ?? undefined,
        contactNo: newClient.contactNo ?? undefined,
        email: newClient.email ?? undefined,
        registrationType: newClient.registrationType ?? undefined,
        pan: newClient.pan ?? undefined,
        distanceForEwayBill: newClient.distanceForEwayBill ?? undefined,
        enable: newClient.enable ?? false,

        // Billing Address Relation
        billingAddress: {
          create: {
            address1: newClient.address1 ?? undefined,
            address2: newClient.address2 ?? undefined,
            landmark: newClient.landmark ?? undefined,
            city: newClient.city,
            state: newClient.state,
            country: newClient.country ?? "India",
            pincode: newClient.pincode ?? undefined,
          },
        },

        // Opening Balance Relation
        openingBalance: {
          create: {
            balanceType: newClient.balanceType,
            amount: newClient.amount,
          },
        },

        // Custom Fields Relation (if provided)
        customFields: newClient.licenseNo
          ? {
              create: {
                licenseNo: newClient.licenseNo ?? undefined,
              },
            }
          : undefined,

        // Additional Details Relation (if provided)
        additionalDetails:
          newClient.faxNo ||
          newClient.website ||
          newClient.note ||
          newClient.dueDays
            ? {
                create: {
                  faxNo: newClient.faxNo ?? undefined,
                  website: newClient.website ?? undefined,
                  note: newClient.note ?? undefined,
                  dueDays: newClient.dueDays ?? undefined,
                },
              }
            : undefined,
      },
    });
    return addCustomerVendor;
  } catch (error) {
    console.log(error);
    return null;
  }
};
