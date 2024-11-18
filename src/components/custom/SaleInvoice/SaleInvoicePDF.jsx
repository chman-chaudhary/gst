"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  section: { marginBottom: 10 },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  table: { display: "flex", flexDirection: "column", border: "1px solid #000" },
  tableRow: { flexDirection: "row", borderBottom: "1px solid #000" },
  tableCell: {
    flex: 1,
    padding: 5,
    borderRight: "1px solid #000",
    textAlign: "center",
  },
  totalRow: { marginTop: 10, fontWeight: "bold", textAlign: "right" },
});

const InvoiceDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>TAX INVOICE - ORIGINAL FOR RECIPIENT</Text>

      <View style={styles.section}>
        <Text>Customer: {data.customerInfo.name}</Text>
        <Text>Address: {data.customerInfo.address}</Text>
        <Text>Phone: {data.customerInfo.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text>Invoice No: {data.invoiceDetails.invoiceNo}</Text>
        <Text>Invoice Date: {data.invoiceDetails.invoiceDate}</Text>
        <Text>Transport: {data.invoiceDetails.transport}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Product</Text>
          <Text style={styles.tableCell}>HSN Code</Text>
          <Text style={styles.tableCell}>Quantity</Text>
          <Text style={styles.tableCell}>Rate</Text>
          <Text style={styles.tableCell}>Discount</Text>
          <Text style={styles.tableCell}>Total</Text>
        </View>
        {data.productRows.map((product, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.tableCell}>{product.product}</Text>
            <Text style={styles.tableCell}>{product.hsnCode}</Text>
            <Text style={styles.tableCell}>{product.quantity}</Text>
            <Text style={styles.tableCell}>{product.rate}</Text>
            <Text style={styles.tableCell}>{product.discount}</Text>
            <Text style={styles.tableCell}>{product.total}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalRow}>
        <Text>TCS: {data.totals.tcs.value}</Text>
        <Text>Discount: {data.totals.discount.value}</Text>
        <Text>Grand Total: {data.totals.grandTotal}</Text>
      </View>

      <Text style={styles.section}>
        Authorized Signatory: {data.authorizedSignatory.name}
      </Text>
    </Page>
  </Document>
);

const SaleInvoicePDF = ({ invoiceData }) => {
  return (
    <div>
      <h1>Generate Sale Invoice</h1>
      <PDFDownloadLink
        document={<InvoiceDocument data={invoiceData} />}
        fileName="sale_invoice.pdf"
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default SaleInvoicePDF;
