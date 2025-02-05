import { useState } from 'react';
import { PlusCircle, CreditCard } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CardData {
  id: string;
  name: string;
  lastFourDigits: string;
  password: string;
  number: string;
  cvv: string;
  expiryDate: string;
  type: 'visa' | 'mastercard' | 'amex';
  color: string;
}

interface CardComponentProps {
  card: CardData;
  isSelected: boolean;
  onFlip: () => void;
  isFlipped: boolean;
  showDetails: boolean;
}

const getCardType = (number: string): 'visa' | 'mastercard' | 'amex' => {
  const cleanNumber = number.replace(/\s/g, '');
  const firstDigit = cleanNumber[0];
  
  if (firstDigit === '4') return 'visa';
  if (firstDigit === '5') return 'mastercard';
  return 'visa'; // default fallback
};

const formatCardNumber = (value: string): string => {
  const cleanValue = value.replace(/\s/g, '');
  const chunks = cleanValue.match(/.{1,4}/g);
  return chunks ? chunks.join(' ') : cleanValue;
};

const formatExpiryDate = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length >= 2) {
    return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
  }
  return cleanValue;
};

const cardColors = [
  'bg-gradient-to-r from-purple-500 to-pink-500',
  'bg-gradient-to-r from-cyan-500 to-blue-500',
  'bg-gradient-to-r from-emerald-500 to-teal-500',
  'bg-gradient-to-r from-orange-500 to-red-500',
];

const CardComponent: React.FC<CardComponentProps> = ({ 
  card, 
  isSelected, 
  onFlip, 
  isFlipped, 
  showDetails 
}) => {
  const displayNumber = showDetails 
    ? formatCardNumber(card.number)
    : `**** **** **** ${card.lastFourDigits}`;

  return (
    <div 
      className={`relative w-96 h-56 rounded-xl transition-all duration-700 cursor-pointer transform-gpu 
        ${isFlipped ? 'rotate-y-180' : ''} preserve-3d`}
      onClick={onFlip}
    >
      {/* Frente de la tarjeta */}
      <div className={`absolute w-full h-full ${card.color} rounded-xl p-6 backface-hidden
        ${isSelected ? 'shadow-2xl scale-105' : 'shadow-lg'}`}>
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div className="h-12">
              {card.type === 'visa' && (
                <div className="text-2xl font-bold text-white">VISA</div>
              )}
              {card.type === 'mastercard' && (
                <div className="text-2xl font-bold text-white">MASTERCARD</div>
              )}
            </div>
            <div className="pt-4">
              <div className="text-xl text-white font-mono">
                {displayNumber}
              </div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-white/60 text-sm">Card Holder</div>
              <div className="text-white font-medium">{card.name}</div>
            </div>
            <div>
              <div className="text-white/60 text-sm">Expires</div>
              <div className="text-white font-medium">{showDetails ? card.expiryDate : 'MM/YY'}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reverso de la tarjeta */}
      <div className={`absolute w-full h-full ${card.color} rounded-xl backface-hidden rotate-y-180`}>
        <div className="h-12 bg-black mt-8" />
        <div className="px-6 py-4">
          <div className="bg-white/20 backdrop-blur-sm h-10 rounded flex items-center px-4">
            <div className="text-white font-mono">
              {showDetails ? card.cvv : '***'}
            </div>
          </div>
          <div className="mt-4 text-white/60 text-sm">
            Este es el reverso de tu tarjeta. Aquí encontrarás el código de seguridad (CVV).
          </div>
        </div>
      </div>
    </div>
  );
};

const CardsManager: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [error, setError] = useState('');
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const [newCard, setNewCard] = useState({
    name: '',
    number: '',
    cvv: '',
    expiryDate: '',
    password: '',
    color: cardColors[0]
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) {
      value = formatCardNumber(value);
      setNewCard({ ...newCard, number: value });
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setNewCard({ ...newCard, cvv: value });
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      value = formatExpiryDate(value);
      setNewCard({ ...newCard, expiryDate: value });
    }
  };

  const handleAddCard = () => {
    const cleanNumber = newCard.number.replace(/\s/g, '');
    
    if (!newCard.name || cleanNumber.length < 16 || newCard.cvv.length < 3 || 
        !newCard.expiryDate.includes('/') || !newCard.password) {
      setError('Por favor complete todos los campos correctamente');
      return;
    }

    const card: CardData = {
      id: Date.now().toString(),
      name: newCard.name,
      lastFourDigits: cleanNumber.slice(-4),
      password: newCard.password,
      number: cleanNumber,
      cvv: newCard.cvv,
      expiryDate: newCard.expiryDate,
      type: getCardType(cleanNumber),
      color: newCard.color
    };

    setCards([...cards, card]);
    setShowAddForm(false);
    setNewCard({
      name: '',
      number: '',
      cvv: '',
      expiryDate: '',
      password: '',
      color: cardColors[0]
    });
    setError('');
  };

  const selectedCard = cards.find(card => card.id === selectedCardId);

  const checkPassword = () => {
    if (selectedCard && password === selectedCard.password) {
      setShowCardDetails(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Cards</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
        >
          <PlusCircle size={20} />
          Add Card
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {showAddForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nueva Tarjeta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <Input
                placeholder="Nombre en la tarjeta"
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
              />
              <Input
                placeholder="Número de tarjeta"
                value={newCard.number}
                onChange={handleCardNumberChange}
                maxLength={19} // 16 números + 3 espacios
              />
              <div className="grid grid-cols-3 gap-4">
                <Input
                  placeholder="CVV"
                  value={newCard.cvv}
                  onChange={handleCvvChange}
                  maxLength={3}
                />
                <Input
                  placeholder="MM/YY"
                  value={newCard.expiryDate}
                  onChange={handleExpiryDateChange}
                  maxLength={5} // MM/YY
                />
                <Select
                  value={newCard.color}
                  onValueChange={(color) => setNewCard({ ...newCard, color })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {cardColors.map((color, index) => (
                      <SelectItem key={color} value={color}>
                        Color {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="password"
                placeholder="Contraseña para ver detalles"
                value={newCard.password}
                onChange={(e) => setNewCard({ ...newCard, password: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddCard}>
                  Guardar Tarjeta
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card) => (
          <div key={card.id} className="flex flex-col items-center gap-4">
            <CardComponent
              card={card}
              isSelected={selectedCardId === card.id}
              onFlip={() => {
                setFlippedCardId(flippedCardId === card.id ? null : card.id);
                setSelectedCardId(card.id);
              }}
              isFlipped={flippedCardId === card.id}
              showDetails={selectedCardId === card.id && showCardDetails}
            />
            
            {selectedCardId === card.id && !showCardDetails && (
              <div className="w-full max-w-md flex gap-2">
                <Input
                  type="password"
                  placeholder="Ingrese contraseña para ver detalles"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={checkPassword}>
                  Ver Detalles
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {cards.length === 0 && !showAddForm && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            <CreditCard size={48} className="mx-auto mb-4 text-gray-400" />
            <p>No hay tarjetas agregadas. Haga clic en "Agregar Tarjeta" para comenzar.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CardsManager;