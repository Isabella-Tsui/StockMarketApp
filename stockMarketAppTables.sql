create table watchlists(
  watchlist_id INT auto_increment primary key,
  userid varchar(30),
  watchlist_name VARCHAR(100),
  foreign key (userid) references users(username)
);

create table stockData (
    -- stock_id == quote Text
    stock_id varchar(30) primary key,
    current_price decimal(30,30),
    change decimal(30,30),
    percentage_change decimal(30,30),
    open decimal(30,30),
    high decimal(30,30),
    low decimal(30,30)
);

create table companyData (
    country varchar(60),
    currency varchar(30),
    estimate_currency varchar(30),
    exchange varchar(60),
    industry varchar(60),
    ipo date,
    logo varchar(200),
    market_capitalization decimal(30,30),
    name varchar(60),
    phone decimal(30,30),
    share_outstanding decimal(30,30),
    -- ticker == quote Text
    ticker varchar(30) primary key,
    weburl varchar(200)
);

create table watchlist_stocks(
    watchlist_id int,
    stock_id varchar(30),
    FOREIGN KEY (watchlist_id) REFERENCES watchlists(watchlist_id),
    FOREIGN KEY (stock_id) REFERENCES stockData(stock_id),
    CONSTRAINT unique_watchlist_stock UNIQUE (watchlist_id, stock_id)
)

