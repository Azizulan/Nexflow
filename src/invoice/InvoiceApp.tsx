import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Download, RotateCcw, RefreshCw } from 'lucide-react';

/* ---------------------------------------------------------------------------
 *  Business details (issuer). Edit here if the company info ever changes.
 * ------------------------------------------------------------------------- */
const BUSINESS = {
  brand: 'OPELLIGENT',
  addressLines: ['85/1-A, Road 10, Kadamtola, Rajarbag Basaboo', 'Dhaka-1214, Bangladesh'],
  email: 'anud2anupama@gmail.com',
  phone: '+880 1625479427',
  logo: '/logo-invoice.png',
};

// Employees who can issue invoices (used for the "Prepared by" selector).
const EMPLOYEES = [
  { name: 'Azizul Hakim Zen', role: 'Founder & Managing Director' },
  { name: 'Mufty Anupama Parvin', role: 'Co-Founder & Head of Operations' },
  { name: 'MD Abul Kashem', role: 'Meta Ads Specialist' },
  { name: 'Md Musa', role: 'Account Manager' },
  { name: 'Rezaul Rohan', role: 'Graphic Designer' },
  { name: 'Shafi Hasan', role: 'Web Designer' },
  { name: 'Rajib Hasan', role: 'Media Buyer' },
];

const CURRENCIES: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', BDT: 'Tk ', AUD: 'A$', CAD: 'C$',
};

type Item = { id: number; description: string; details: string; qty: number; price: number };

const todayISO = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
};

const genInvoiceNo = () =>
  `OPL-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;

const fmtDate = (iso: string) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${m} / ${d} / ${y}`;
};

let _id = 1;
const newItem = (): Item => ({ id: _id++, description: '', details: '', qty: 1, price: 0 });

export default function InvoiceApp() {
  const [preparedBy, setPreparedBy] = useState(1); // index in EMPLOYEES
  const [invoiceNo, setInvoiceNo] = useState(genInvoiceNo());
  const [date, setDate] = useState(todayISO());
  const [status, setStatus] = useState<'PAID' | 'DUE'>('PAID');
  const [currency, setCurrency] = useState('USD');

  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  const [items, setItems] = useState<Item[]>([
    { id: _id++, description: 'Meta (Facebook & Instagram) Ad Campaign Management', details: 'Planning, setup, and management of Meta advertising campaigns, including audience targeting, ad creative, budget management, and daily performance optimisation.', qty: 1, price: 350 },
  ]);

  const [taxRate, setTaxRate] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Payoneer');
  const [paymentId, setPaymentId] = useState('');
  const [accountName, setAccountName] = useState('Mufty Anupama Parvin');
  const [terms, setTerms] = useState('Payment received in full via Payoneer. This invoice is issued as a record of digital marketing services rendered by OPELLIGENT. No further amount is due.');

  const sym = CURRENCIES[currency] || '';
  const money = (n: number) => `${sym}${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const subtotal = useMemo(() => items.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.price) || 0), 0), [items]);
  const taxAmt = useMemo(() => subtotal * (Number(taxRate) || 0) / 100, [subtotal, taxRate]);
  const total = subtotal + taxAmt;

  const employee = EMPLOYEES[preparedBy];

  const updateItem = (id: number, patch: Partial<Item>) =>
    setItems(prev => prev.map(it => (it.id === id ? { ...it, ...patch } : it)));
  const removeItem = (id: number) => setItems(prev => prev.filter(it => it.id !== id));

  const resetAll = () => {
    if (!confirm('Clear the form and start a new invoice?')) return;
    setInvoiceNo(genInvoiceNo());
    setDate(todayISO());
    setStatus('PAID');
    setCurrency('USD');
    setClientName('');
    setClientAddress('');
    setItems([newItem()]);
    setTaxRate(0);
    setPaymentMethod('Payoneer');
    setPaymentId('');
  };

  const label = 'block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1';
  const input = 'w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition';

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <style dangerouslySetInnerHTML={{ __html: SHEET_CSS }} />

      {/* Top bar */}
      <header className="no-print sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={BUSINESS.logo} alt={BUSINESS.brand} className="h-7 w-auto" />
            <span className="text-sm font-semibold text-gray-400 hidden sm:inline">Invoice Generator</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={resetAll} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <RotateCcw size={15} /> <span className="hidden sm:inline">New</span>
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D0D12] text-white text-sm font-bold hover:bg-[#26262e]">
              <Download size={16} /> Download / Print PDF
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-5 py-6 grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-8 items-start">
        {/* ---------------- FORM ---------------- */}
        <div className="no-print flex flex-col gap-5">
          <Section title="Invoice Details">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className={label}>Invoice #</span>
                <div className="flex gap-1">
                  <input className={input} value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} />
                  <button title="Generate new number" onClick={() => setInvoiceNo(genInvoiceNo())} className="px-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50"><RefreshCw size={14} /></button>
                </div>
              </div>
              <div>
                <span className={label}>Date</span>
                <input type="date" className={input} value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div>
                <span className={label}>Status</span>
                <select className={input} value={status} onChange={e => setStatus(e.target.value as 'PAID' | 'DUE')}>
                  <option value="PAID">PAID</option>
                  <option value="DUE">DUE</option>
                </select>
              </div>
              <div>
                <span className={label}>Currency</span>
                <select className={input} value={currency} onChange={e => setCurrency(e.target.value)}>
                  {Object.keys(CURRENCIES).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-3">
              <span className={label}>Prepared by (employee)</span>
              <select className={input} value={preparedBy} onChange={e => setPreparedBy(Number(e.target.value))}>
                {EMPLOYEES.map((emp, i) => <option key={emp.name} value={i}>{emp.name} — {emp.role}</option>)}
              </select>
            </div>
          </Section>

          <Section title="Bill To (Client)">
            <span className={label}>Client name</span>
            <input className={input} value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Peoms Islam" />
            <span className={`${label} mt-3`}>Client address (optional)</span>
            <textarea className={input} rows={2} value={clientAddress} onChange={e => setClientAddress(e.target.value)} placeholder="Street, city, country" />
          </Section>

          <Section title="Items">
            <div className="flex flex-col gap-4">
              {items.map((it, idx) => (
                <div key={it.id} className="rounded-lg border border-gray-200 p-3 bg-gray-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-400">ITEM {idx + 1}</span>
                    {items.length > 1 && (
                      <button onClick={() => removeItem(it.id)} className="text-red-500 hover:text-red-700"><Trash2 size={15} /></button>
                    )}
                  </div>
                  <input className={input} value={it.description} onChange={e => updateItem(it.id, { description: e.target.value })} placeholder="Service title" />
                  <textarea className={`${input} mt-2`} rows={2} value={it.details} onChange={e => updateItem(it.id, { details: e.target.value })} placeholder="Description / details (optional)" />
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <span className={label}>Qty</span>
                      <input type="number" min={0} className={input} value={it.qty} onChange={e => updateItem(it.id, { qty: Number(e.target.value) })} />
                    </div>
                    <div>
                      <span className={label}>Unit price ({currency})</span>
                      <input type="number" min={0} step="0.01" className={input} value={it.price} onChange={e => updateItem(it.id, { price: Number(e.target.value) })} />
                    </div>
                  </div>
                  <div className="text-right text-sm font-semibold text-gray-700 mt-2">Line total: {money((Number(it.qty) || 0) * (Number(it.price) || 0))}</div>
                </div>
              ))}
              <button onClick={() => setItems(prev => [...prev, newItem()])} className="flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-gray-400 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Plus size={16} /> Add item
              </button>
            </div>
            <div className="mt-3">
              <span className={label}>Tax (%)</span>
              <input type="number" min={0} step="0.01" className={input} value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} />
            </div>
          </Section>

          <Section title="Payment Information">
            <div className="grid grid-cols-2 gap-3">
              <div><span className={label}>Method</span><input className={input} value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} /></div>
              <div><span className={label}>Payment ID</span><input className={input} value={paymentId} onChange={e => setPaymentId(e.target.value)} placeholder="e.g. 911140689" /></div>
            </div>
            <span className={`${label} mt-3`}>Account name</span>
            <input className={input} value={accountName} onChange={e => setAccountName(e.target.value)} />
            <span className={`${label} mt-3`}>Terms &amp; conditions</span>
            <textarea className={input} rows={3} value={terms} onChange={e => setTerms(e.target.value)} />
          </Section>

          <p className="text-xs text-gray-500 leading-relaxed">
            Tip: click <strong>Download / Print PDF</strong>, then choose <strong>“Save as PDF”</strong> as the destination. Set margins to <strong>None/Default</strong> and enable <strong>Background graphics</strong> for best results.
          </p>
        </div>

        {/* ---------------- PREVIEW ---------------- */}
        <div className="inv-preview-wrap">
          <div className="inv-zoom">
            <div className="inv-sheet">
              <div className="inv-topbar" />
              <div className="inv-head">
                <div className="inv-brand">
                  <img src={BUSINESS.logo} alt={BUSINESS.brand} />
                  <div className="inv-name">{employee.name}</div>
                  <div className="inv-role">{employee.role}</div>
                  <div className="inv-contact">
                    {BUSINESS.addressLines.map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}
                    {BUSINESS.email}&nbsp;|&nbsp;{BUSINESS.phone}
                  </div>
                </div>
                <div className="inv-title">
                  <h1>INVOICE</h1>
                  <div className="inv-meta">
                    <div className="r"><span className="k">Invoice #</span><span className="v">{invoiceNo || '-'}</span></div>
                    <div className="r"><span className="k">Date</span><span className="v">{fmtDate(date)}</span></div>
                    <div className="r"><span className="k">Status</span><span className="v" style={{ color: status === 'PAID' ? '#1a8a4a' : '#b4690e' }}>{status}</span></div>
                  </div>
                </div>
              </div>

              <div className="inv-billto">
                <div className="inv-billlabel">Invoice To</div>
                <div className="inv-client">{clientName || 'Client name'}</div>
                {clientAddress && <div className="inv-clientaddr">{clientAddress}</div>}
              </div>

              <table className="inv-table">
                <thead>
                  <tr><th style={{ width: 36 }}>SL</th><th>Item Description</th><th className="r" style={{ width: 90 }}>Price</th><th className="c" style={{ width: 50 }}>Qty</th><th className="r" style={{ width: 100 }}>Total</th></tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={it.id}>
                      <td>{i + 1}</td>
                      <td>
                        <div className="inv-itemtitle">{it.description || 'Service'}</div>
                        {it.details && <div className="inv-itemdesc">{it.details}</div>}
                      </td>
                      <td className="r">{money(Number(it.price) || 0)}</td>
                      <td className="c">{it.qty}</td>
                      <td className="r">{money((Number(it.qty) || 0) * (Number(it.price) || 0))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="inv-lower">
                <div className="inv-pay">
                  <div className="inv-billlabel">Payment Information</div>
                  <div className="inv-prow"><span className="k">Payment Method</span><span className="v">{paymentMethod || '-'}</span></div>
                  {paymentId && <div className="inv-prow"><span className="k">Payment ID</span><span className="v">{paymentId}</span></div>}
                  <div className="inv-prow"><span className="k">Account Name</span><span className="v">{accountName || '-'}</span></div>
                  <div className="inv-prow"><span className="k">Currency</span><span className="v">{currency}</span></div>
                </div>
                <div className="inv-totals">
                  <div className="trow sub"><span>Sub Total</span><span>{money(subtotal)}</span></div>
                  <div className="trow"><span>Tax</span><span>{(Number(taxRate) || 0).toFixed(2)}%</span></div>
                  <div className="trow grand"><span>Total {status === 'PAID' ? 'Paid' : 'Due'}</span><span>{money(total)}</span></div>
                  <div className="inv-badge" style={{ borderColor: status === 'PAID' ? '#1a8a4a' : '#b4690e', color: status === 'PAID' ? '#1a8a4a' : '#b4690e' }}>{status}</div>
                </div>
              </div>

              <div className="inv-terms">
                <div className="tc">
                  <div className="inv-billlabel">Terms &amp; Conditions</div>
                  <p>{terms}</p>
                </div>
                <div className="sign">
                  <div className="line" />
                  <div className="who">{employee.name}</div>
                  <div className="sub">Authorised Signature, {BUSINESS.brand}</div>
                </div>
              </div>

              <div className="inv-thanks">Thank you for your business</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h2 className="text-sm font-bold text-gray-800 mb-3">{title}</h2>
      {children}
    </div>
  );
}

const SHEET_CSS = `
.inv-preview-wrap { display:flex; justify-content:center; }
.inv-zoom { zoom: 0.66; }
@media (max-width: 900px){ .inv-zoom { zoom: 0.42; } }
.inv-sheet { width:210mm; min-height:297mm; background:#fff; color:#1a1a1a; font-family:'Inter',sans-serif; font-size:12.5px; line-height:1.5; position:relative; padding:16mm 16mm 0; box-shadow:0 10px 40px rgba(0,0,0,.18); }
.inv-topbar { height:6px; background:#C9A84C; position:absolute; top:0; left:0; right:0; }
.inv-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:26px; padding-top:8px; }
.inv-brand img { height:40px; width:auto; display:block; margin-bottom:12px; }
.inv-name { font-weight:700; font-size:13px; }
.inv-role { color:#777; font-size:11px; margin-bottom:8px; }
.inv-contact { color:#555; font-size:11px; line-height:1.6; }
.inv-title { text-align:right; }
.inv-title h1 { font-size:38px; letter-spacing:7px; font-weight:800; color:#0D0D12; }
.inv-meta { margin-top:12px; font-size:12px; }
.inv-meta .r { display:flex; justify-content:flex-end; gap:12px; margin-bottom:3px; }
.inv-meta .k { color:#888; }
.inv-meta .v { font-weight:700; min-width:110px; text-align:right; }
.inv-billto { background:#faf7ef; border-left:3px solid #C9A84C; padding:12px 16px; margin-bottom:22px; }
.inv-billlabel { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#C9A84C; font-weight:700; margin-bottom:4px; }
.inv-client { font-weight:700; font-size:15px; }
.inv-clientaddr { color:#555; font-size:11.5px; margin-top:2px; }
.inv-table { width:100%; border-collapse:collapse; }
.inv-table thead th { background:#0D0D12; color:#FAF8F5; text-align:left; padding:11px 12px; font-size:10.5px; letter-spacing:1px; text-transform:uppercase; font-weight:600; }
.inv-table thead th.c { text-align:center; } .inv-table thead th.r { text-align:right; }
.inv-table tbody td { padding:14px 12px; border-bottom:1px solid #ededed; vertical-align:top; }
.inv-table tbody td.c { text-align:center; } .inv-table tbody td.r { text-align:right; font-weight:700; white-space:nowrap; }
.inv-itemtitle { font-weight:700; font-size:13px; margin-bottom:3px; }
.inv-itemdesc { color:#666; font-size:11.5px; }
.inv-lower { display:flex; justify-content:space-between; gap:30px; margin-top:26px; }
.inv-pay { flex:1; }
.inv-prow { font-size:12px; margin-bottom:4px; }
.inv-prow .k { color:#888; display:inline-block; min-width:110px; }
.inv-prow .v { font-weight:600; }
.inv-totals { width:270px; }
.inv-totals .trow { display:flex; justify-content:space-between; padding:7px 12px; font-size:12.5px; }
.inv-totals .trow.sub { border-bottom:1px solid #ededed; }
.inv-totals .trow.grand { background:#C9A84C; color:#0D0D12; font-weight:800; font-size:16px; border-radius:6px; margin-top:6px; }
.inv-badge { display:inline-block; margin-top:12px; float:right; border:2px solid #1a8a4a; font-weight:800; letter-spacing:3px; padding:5px 14px; border-radius:6px; font-size:12px; }
.inv-terms { margin-top:48px; display:flex; justify-content:space-between; align-items:flex-end; gap:40px; }
.inv-terms .tc { max-width:60%; }
.inv-terms .tc p { color:#666; font-size:11px; }
.inv-terms .sign { text-align:center; }
.inv-terms .sign .line { width:180px; border-top:1px solid #999; margin-bottom:6px; }
.inv-terms .sign .who { font-weight:700; font-size:12px; }
.inv-terms .sign .sub { color:#888; font-size:10.5px; }
.inv-thanks { position:absolute; bottom:0; left:0; right:0; background:#0D0D12; color:#FAF8F5; text-align:center; padding:12px; font-size:12px; letter-spacing:1px; }

@media print {
  @page { size: A4; margin: 0; }
  html, body { background:#fff !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .no-print { display:none !important; }
  .inv-preview-wrap { display:block; padding:0 !important; }
  .inv-zoom { zoom:1 !important; }
  .inv-sheet { box-shadow:none !important; margin:0 !important; }
}
`;
