import { useState } from 'react';

interface TransactionFormProps {
  onSubmit: (transaction: {
    type: 'ingreso' | 'gasto';
    description: string;
    amount: number;
  }) => void;
}

const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  
  const [type, setType] = useState<'ingreso' | 'gasto' | 'transferencia' | ''>('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (type === '') return alert('Por favor, selecciona un tipo');

    
    onSubmit({
      type,
      description,
      amount: Number(amount) 
    });

    
    setType('');
    setDescription('');
    setAmount('');
  };

  return (
    <> 
      <h3>Realizar Transacción</h3>
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Movimiento Bancario</h2>

        <label htmlFor="tipo">Tipo de movimiento</label>
        <select 
          id="tipo" 
          value={type} 
          onChange={(e) => setType(e.target.value as 'ingreso' | 'gasto')} 
          required
        >
          <option value="">Seleccione una opción</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
          <option value="gasto">Transferencia</option>

        </select>

        <label htmlFor="descripcion">Descripción</label>
        <input
          type="text"
          id="descripcion"
          placeholder="Ej. Pago de nómina"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="monto">Monto</label>
        <input
          type="number"
          id="monto"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default TransactionForm;