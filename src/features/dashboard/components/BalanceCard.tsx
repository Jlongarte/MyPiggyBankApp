interface BalanceCardProps {
  balance: number; 
}


const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <div className="balance-card">
      <h3>Saldo Disponible</h3>
     
      <h2>${balance.toLocaleString()}</h2> 
    </div>
  )
}

export default BalanceCard;