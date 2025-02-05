import { PlusCircle, DollarSign, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORIES } from '../hooks/constants';

const examplePayments = [
  { id: '1', category: 'food', description: 'Cena en restaurante', amount: 45.00, date: '2024-02-01' },
  { id: '2', category: 'transport', description: 'Taxi', amount: 15.00, date: '2024-02-02' },
];

const Payments = () => {
  return (
    <div className="flex min-h-screen h-screen bg-gray-50 p-6 gap-6">
      {/* Lista de Gastos */}
      <div className="w-1/2 min-h-[500px]">
        <Card className="min-h-[900px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Gastos Registrados</span>
              <DollarSign className="w-6 h-6 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[500px] overflow-auto">
            <div className="space-y-6 min-h-[500px]">
              {/* Resumen por Categoría */}
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map(({ id, name, icon: Icon, color }) => (
                  <div
                    key={id}
                    className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      {Icon && <Icon className={`w-4 h-4 ${color}`} />}
                      <span className="text-sm font-medium">{name}</span>
                    </div>
                    <span className="font-bold">$100.00</span>
                  </div>
                ))}
              </div>

              {/* Lista de Gastos */}
              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                {examplePayments.length > 0 ? (
                  examplePayments.map(({ id, category, description, amount, date }) => {
                    const categoryData = CATEGORIES.find((cat) => cat.id === category);
                    const Icon = categoryData?.icon || PieChart;
                    
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <Icon className={`w-5 h-5 ${categoryData?.color}`} />
                          <div>
                            <p className="font-medium">{description}</p>
                            <div className="flex space-x-2 text-sm text-gray-500">
                              <span>{categoryData?.name}</span>
                              <span>•</span>
                              <span>{date}</span>
                            </div>
                          </div>
                        </div>
                        <span className="font-medium">${amount.toFixed(2)}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">No hay gastos registrados</div>
                )}
              </div>

              {/* Total Gastos */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg flex justify-between items-center">
                <span className="font-medium">Total Gastos:</span>
                <span className="text-xl font-bold text-green-600">$160.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulario para Agregar Gasto */}
      <div className="w-1/2 min-h-[500px]">
        <Card className="min-h-[900px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Agregar Nuevo Gasto</span>
              <PieChart className="w-6 h-6 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[500px] flex flex-col justify-between">
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {CATEGORIES.map(({ id, name, icon: Icon, color }) => (
                  <button
                    key={id}
                    className="p-3 rounded-lg transition-all duration-200 hover:scale-105 bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      {Icon && <Icon className={`w-5 h-5 ${color}`} />}
                      <span className="text-sm font-medium">{name}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <Input placeholder="Descripción" />
                <Input type="number" placeholder="Monto" />
                <Button disabled>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Agregar Gasto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;
