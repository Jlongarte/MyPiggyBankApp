
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'ingreso' | 'gasto'; 
  transferedFrom?: string;
  transferedTo?: string;      
}


interface TransactionListProps {
  transactions: Transaction[]; 
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="transaction-list">
      <h3>Historial de Actividad</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className={`transaction-item ${transaction.type}`}>
            <div>
              <p className="description">{transaction.description}</p>
              <p className="date">{transaction.date}</p>
              {transaction.transferedTo && <p className="receiver">Para: {transaction.transferedTo}</p>}
            </div>
            {/* Si es gasto muestra menos (-), si es ingreso muestra más (+) */}
            <p className="amount">
              {transaction.type === 'gasto' ? '-' : '+'}${transaction.amount.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;