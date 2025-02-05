import { useState, useRef, useEffect } from "react";
import { Search, Filter, Calendar, FileText, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const transactions = [
  { id: 1, date: "Aug 29", method: "🍏 Apple Pay", type: "Transfer", category: "Shopping", amount: "$232,562" },
  { id: 2, date: "Aug 29", method: "📱 Google Pay", type: "Payment", category: "Bills", amount: "$232,562" },
  { id: 3, date: "Aug 28", method: "💰 Paypal", type: "Bank Transfer", category: "Freelance", amount: "$232,562" },
  { id: 4, date: "Aug 27", method: "🛒 Amazon Pay", type: "Send Money", category: "Shopping", amount: "$232,562" },
  { id: 5, date: "Aug 27", method: "💰 Paypal", type: "Bank Transfer", category: "Freelance", amount: "$232,562" },
  { id: 6, date: "Aug 27", method: "🍏 Apple Pay", type: "Payment", category: "Dining", amount: "$232,562" },
  { id: 1, date: "Aug 29", method: "🍏 Apple Pay", type: "Transfer", category: "Shopping", amount: "$232,562" },
  { id: 2, date: "Aug 29", method: "📱 Google Pay", type: "Payment", category: "Bills", amount: "$232,562" },
  { id: 3, date: "Aug 28", method: "💰 Paypal", type: "Bank Transfer", category: "Freelance", amount: "$232,562" },
  { id: 4, date: "Aug 27", method: "🛒 Amazon Pay", type: "Send Money", category: "Shopping", amount: "$232,562" },
  { id: 5, date: "Aug 27", method: "💰 Paypal", type: "Bank Transfer", category: "Freelance", amount: "$232,562" },
  { id: 6, date: "Aug 27", method: "🍏 Apple Pay", type: "Payment", category: "Dining", amount: "$232,562" },
  { id: 1, date: "Aug 29", method: "🍏 Apple Pay", type: "Transfer", category: "Shopping", amount: "$232,562" },
  { id: 2, date: "Aug 29", method: "📱 Google Pay", type: "Payment", category: "Bills", amount: "$232,562" },
  { id: 3, date: "Aug 28", method: "💰 Paypal", type: "Bank Transfer", category: "Freelance", amount: "$232,562" },
  { id: 4, date: "Aug 27", method: "🛒 Amazon Pay", type: "Send Money", category: "Shopping", amount: "$232,562" },
  { id: 5, date: "Aug 27", method: "💰 Paypal", type: "Bank Transfer", category: "Freelance", amount: "$232,562" },
  { id: 6, date: "Aug 27", method: "🍏 Apple Pay", type: "Payment", category: "Dining", amount: "$232,562" }
];

const TransactionsTable = () => {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const filteredTransactions = transactions.filter((t) =>
    t.method.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory ? t.category === selectedCategory : true)
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <CardTitle className="text-lg font-semibold">Transactions</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 w-72 rounded-lg border-gray-300 shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> August 10 - August 29
              </Button>
              <div className="relative w-48">
                <Button 
                  ref={buttonRef}
                  variant="outline" 
                  className="flex items-center justify-between w-full px-4 py-2"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <Filter className="w-4 h-4" /> Filter
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${filterOpen ? 'rotate-180' : 'rotate-0'}`} />
                </Button>
                {filterOpen && (
                  <div ref={filterRef} className="absolute right-0 mt-2 bg-white border shadow-md p-4 rounded-lg w-full animate-fade-in">
                    <select 
                      className="p-2 border rounded-md w-full" 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Bills">Bills</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Dining">Dining</option>
                      <option value="Savings">Savings</option>
                      <option value="Transport">Transport</option>
                      <option value="Food">Food</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Health">Health</option>
                      <option value="Housing">Housing</option>
                      <option value="Utilities">Utilities</option>
                    </select>
                  </div>
                )}
              </div>
              <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
                <FileText className="w-4 h-4" /> Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>To / From</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.method}</TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>{t.category}</TableCell>
                  <TableCell className="text-right">{t.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsTable;
