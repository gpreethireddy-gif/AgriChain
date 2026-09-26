// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AgriChain {

    struct Transaction {
        uint256 orderId;
        string productName;
        string farmerName;
        string buyerName;
        uint256 quantity;
        uint256 price;
        uint256 timestamp;
    }

    Transaction[] public transactions;

    event TransactionRecorded(
        uint256 orderId,
        string productName,
        string farmerName,
        string buyerName,
        uint256 quantity,
        uint256 price,
        uint256 timestamp
    );

    function recordTransaction(
        uint256 _orderId,
        string memory _productName,
        string memory _farmerName,
        string memory _buyerName,
        uint256 _quantity,
        uint256 _price
    ) public {

        Transaction memory newTransaction = Transaction({
            orderId: _orderId,
            productName: _productName,
            farmerName: _farmerName,
            buyerName: _buyerName,
            quantity: _quantity,
            price: _price,
            timestamp: block.timestamp
        });

        transactions.push(newTransaction);

        emit TransactionRecorded(
            _orderId,
            _productName,
            _farmerName,
            _buyerName,
            _quantity,
            _price,
            block.timestamp
        );
    }

    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }

    function getTransaction(
        uint256 _index
    )
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        Transaction memory transaction = transactions[_index];

        return (
            transaction.orderId,
            transaction.productName,
            transaction.farmerName,
            transaction.buyerName,
            transaction.quantity,
            transaction.price,
            transaction.timestamp
        );
    }
}