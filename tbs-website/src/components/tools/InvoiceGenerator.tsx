"use client";

import { useState } from 'react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export default function InvoiceGenerator() {
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  
  const [toName, setToName] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [toAddress, setToAddress] = useState('');
  
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0 }
  ]);
  
  const [notes, setNotes] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: String(items.length + 1),
        description: '',
        quantity: 1,
        rate: 0
      }
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleGenerateInvoice = () => {
    setShowPreview(true);
  };

  const handleEditInvoice = () => {
    setShowPreview(false);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-primary to-accent text-white">
        <h3 className="text-xl font-bold mb-1">Invoice Generator</h3>
        <p className="text-xs opacity-80">Create professional invoices for your clients</p>
      </div>
      
      {!showPreview ? (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Invoice Details</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Your Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name/Business</label>
                  <input
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="Your name or business name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    placeholder="Your address"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Client Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name/Business</label>
                <input
                  type="text"
                  value={toName}
                  onChange={(e) => setToName(e.target.value)}
                  placeholder="Client name or business name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
                <input
                  type="email"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  placeholder="client@email.com"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Address</label>
                <textarea
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  placeholder="Client address"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={2}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Invoice Items</h4>
              <button
                onClick={addItem}
                className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm"
              >
                + Add Item
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Rate</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">Amount</th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Item description"
                          className="w-full p-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          min="1"
                          className="w-20 p-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.01"
                          className="w-24 p-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="p-2 text-gray-700">
                        ${(item.quantity * item.rate).toFixed(2)}
                      </td>
                      <td className="p-2">
                        {items.length > 1 && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t">
                    <td colSpan={3} className="p-2 text-right font-medium">Subtotal:</td>
                    <td className="p-2 text-gray-700">${calculateSubtotal().toFixed(2)}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="p-2 text-right font-medium">Tax (10%):</td>
                    <td className="p-2 text-gray-700">${calculateTax().toFixed(2)}</td>
                    <td></td>
                  </tr>
                  <tr className="border-t">
                    <td colSpan={3} className="p-2 text-right font-medium">Total:</td>
                    <td className="p-2 font-bold text-primary">${calculateTotal().toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Payment terms, thank you message, etc."
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleGenerateInvoice}
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
            >
              Generate Invoice
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6" id="invoice-preview">
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">INVOICE</h2>
              <p className="text-gray-600">{invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">Issue Date: {issueDate}</p>
              <p className="font-medium">Due Date: {dueDate}</p>
            </div>
          </div>
          
          <div className="flex justify-between mb-8">
            <div>
              <h3 className="font-bold text-gray-700 mb-1">From:</h3>
              <p className="text-gray-800">{fromName}</p>
              <p className="text-gray-600">{fromEmail}</p>
              <p className="text-gray-600 whitespace-pre-line">{fromAddress}</p>
            </div>
            <div className="text-right">
              <h3 className="font-bold text-gray-700 mb-1">To:</h3>
              <p className="text-gray-800">{toName}</p>
              <p className="text-gray-600">{toEmail}</p>
              <p className="text-gray-600 whitespace-pre-line">{toAddress}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-medium text-gray-700">Description</th>
                  <th className="p-3 text-right font-medium text-gray-700">Quantity</th>
                  <th className="p-3 text-right font-medium text-gray-700">Rate</th>
                  <th className="p-3 text-right font-medium text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3 text-gray-800">{item.description || 'Item description'}</td>
                    <td className="p-3 text-right text-gray-600">{item.quantity}</td>
                    <td className="p-3 text-right text-gray-600">${item.rate.toFixed(2)}</td>
                    <td className="p-3 text-right text-gray-800">${(item.quantity * item.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="p-3 text-right font-medium">Subtotal:</td>
                  <td className="p-3 text-right text-gray-800">${calculateSubtotal().toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="p-3 text-right font-medium">Tax (10%):</td>
                  <td className="p-3 text-right text-gray-800">${calculateTax().toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="p-3 text-right font-bold">Total:</td>
                  <td className="p-3 text-right font-bold text-primary">${calculateTotal().toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          {notes && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-700 mb-2">Notes:</h3>
              <p className="text-gray-600 whitespace-pre-line">{notes}</p>
            </div>
          )}
          
          <div className="flex justify-center gap-4">
            <button
              onClick={handleEditInvoice}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Edit Invoice
            </button>
            <button
              onClick={handlePrintInvoice}
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
            >
              Print / Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}