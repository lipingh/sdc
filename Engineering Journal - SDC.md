

## Postgres Synax

```sql
# start postgres
psql postgres
# show all database
SELECT datname FROM pg_database;
# acess to sdc database
\c sdc
# show all the tables 
\dt+

# log as user me
psql -d postgres -U me

#list views
\dm
```



## Aug 9, 2021

CSV files we need for reviews & ratings API service

- Product.csv
- Character_review.csv
- characteristic.csv
- Review_photos.csv
- Reviews.csv

tried to deploy postgres in docker

```bash
sudo docker run --name tutorial -p 5433:5432 \
                -e POSTGRES_PASSWORD=jelly \
                -d postgres
```

```bash
tar xJf postgrest-v8.0.0-linux-x64-static.tar.xz
```

tar: Error opening archive: Failed to open 'postgrest-v8.0.0-linux-x64-static.tar.xz'

```bash 
# install stack if not
# install dependencies
brew install libpq
brew install gmp
 
git clone https://github.com/PostgREST/postgrest.git
cd postgrest

# adjust local-bin-path to taste
stack build --install-ghc --copy-bins --local-bin-path /usr/local/bin
# If building fails and your system has less than 1GB of memory, try adding a swap file.
# –install-ghc flag is only needed for the first build and can be omitted in the subsequent builds.
```

## Aug 10, 2021

search Pagination in a loop

```sql
DECLARE @PageNumber AS INT
            DECLARE @RowsOfPage AS INT
        DECLARE @MaxTablePage  AS FLOAT 
        SET @PageNumber=1
        SET @RowsOfPage=4
        SELECT @MaxTablePage = COUNT(*) FROM SampleFruits
        SET @MaxTablePage = CEILING(@MaxTablePage/@RowsOfPage)
        WHILE @MaxTablePage >= @PageNumber
        BEGIN
         SELECT FruitName,Price FROM SampleFruits
        ORDER BY Price 
        OFFSET (@PageNumber-1)*@RowsOfPage ROWS
        FETCH NEXT @RowsOfPage ROWS ONLY
        SET @PageNumber = @PageNumber + 1
        END
```

Sql vs NoSQL

- reviews need to sort by helpful, newest, relevant, sql works better here, if it can order by a col, while NoSql needs to go over the whole table, and compare
- The Api should support pagination, both will work





```bash

```



## Aug 11, 2021

TO DO

- Download product csv file
- generate sample csv files using python -> no need, sample data will miss product_id, and futher data can't insert
- load sample csv files to postgres for testing, postman
- Generate the models and controls
- if all works fine, load the whole data

```sql
# change timestamp to datetime
TO_CHAR(TO_TIMESTAMP(bigint_field / 1000), 'DD/MM/YYYY HH24:MI:SS')
```

```sql
# example, copy csv files data to postgres
COPY persons(first_name, last_name, dob, email)
FROM 'C:\sampledb\persons.csv'
DELIMITER ','
CSV HEADER;
```

## EXPLAIN ANALYZE

### get the total number of star 5

```
EXPLAIN ANALYZE
select count(*) from reviews where rating=5;                                                              
```

----------------------------------------------------------------------------------------------------------------------------------------------
 Finalize Aggregate  (cost=289658.37..289658.38 rows=1 width=8) (actual time=6880.202..6884.140 rows=1 loops=1)
   ->  Gather  (cost=289658.15..289658.36 rows=2 width=8) (actual time=6880.084..6884.134 rows=3 loops=1)
         Workers Planned: 2
         Workers Launched: 2
         ->  Partial Aggregate  (cost=288658.15..288658.16 rows=1 width=8) (actual time=6864.572..6864.573 rows=1 loops=3)
               ->  Parallel Seq Scan on reviews  (cost=0.00..287461.78 rows=478550 width=0) (actual time=0.400..6796.382 rows=384748 loops=3)
                     Filter: (rating = 5)
                     Rows Removed by Filter: 1540236
 Planning Time: 0.116 ms
 Execution Time: 6884.198 ms
(10 rows)

### get the total number of star 4

```sql
EXPLAIN ANALYZE
select count(*) from reviews where rating=4;                                                             
```
----------------------------------------------------------------------------------------------------------------------------------------------
 Finalize Aggregate  (cost=289669.99..289670.00 rows=1 width=8) (actual time=9648.460..9652.423 rows=1 loops=1)
   ->  Gather  (cost=289669.78..289669.99 rows=2 width=8) (actual time=9648.436..9652.404 rows=3 loops=1)
         Workers Planned: 2
         Workers Launched: 2
         ->  Partial Aggregate  (cost=288669.78..288669.79 rows=1 width=8) (actual time=9641.237..9641.237 rows=1 loops=3)
               ->  Parallel Seq Scan on reviews  (cost=0.00..287461.78 rows=483201 width=0) (actual time=6.586..9582.053 rows=384859 loops=3)
                     Filter: (rating = 4)
                     Rows Removed by Filter: 1540125
 Planning Time: 0.365 ms
 Execution Time: 9652.689 ms
(10 rows)

---

```sql
EXPLAIN ANALYZE
select count(*) from reviews where reported=false;                                                              
```

-------------------------------------------------------------------------------------------------------------------------------------------------
 Finalize Aggregate  (cost=288158.44..288158.45 rows=1 width=8) (actual time=10360.103..10364.204 rows=1 loops=1)
   ->  Gather  (cost=288158.22..288158.43 rows=2 width=8) (actual time=10359.996..10364.188 rows=3 loops=1)
         Workers Planned: 2
         Workers Launched: 2
         ->  Partial Aggregate  (cost=287158.22..287158.23 rows=1 width=8) (actual time=10350.073..10350.074 rows=1 loops=3)
               ->  Parallel Seq Scan on reviews  (cost=0.00..281446.82 rows=2284560 width=0) (actual time=6.483..10131.873 rows=1828448 loops=3)
                     Filter: (NOT reported)
                     Rows Removed by Filter: 96536
 Planning Time: 0.184 ms
 Execution Time: 10364.360 ms
(10 rows)

---

```sql
EXPLAIN ANALYZE
select rating, count(*) from reviews
group by product_id, rating;
```

 Finalize GroupAggregate (cost=294476.86..294478.13 rows=5 width=12) (actual time=10565.756..10569.987 rows=5 loops=1)

  Group Key: rating

  -> Gather Merge (cost=294476.86..294478.03 rows=10 width=12) (actual time=10565.743..10569.970 rows=15 loops=1)

​     Workers Planned: 2

​     Workers Launched: 2

​     -> Sort (cost=293476.84..293476.85 rows=5 width=12) (actual time=10546.634..10546.636 rows=5 loops=3)

​        Sort Key: rating

​        Sort Method: quicksort Memory: 25kB

​        Worker 0: Sort Method: quicksort Memory: 25kB

​        Worker 1: Sort Method: quicksort Memory: 25kB

​        -> Partial HashAggregate (cost=293476.73..293476.78 rows=5 width=12) (actual time=10538.586..10538.589 rows=5 loops=3)

​           Group Key: rating

​           Batches: 1 Memory Usage: 24kB

​           Worker 0: Batches: 1 Memory Usage: 24kB

​           Worker 1: Batches: 1 Memory Usage: 24kB



## Decisions

1. use materialized view to pre-aggregate the rows to speed up queries.

   - Review_meta

     ```sql
     CREATE MATERIALIZED VIEW reviews_meta AS 
     SELECT product_id, rating, count(*)
     FROM reviews
     GROUP BY product_id, rating;
     ```

     ```sql
     # refresh view when write a new view
     REFRESH MATERIALIZED VIEW mymatview;
     ```

   - Review

 trade-offs: more storage needed

Materialized Views or aggreateTo improve the query performance, I need to create several view for that

[Standard views](https://www.postgresql.org/docs/current/sql-createview.html) represent the result of a query without actually storing data.

```sql
CREATE VIEW ratings_breakdown AS
  SELECT rating, count(*)
  FROM reviews
  GROUP BY product_id, rating;
```



```sql
CREATE VIEW ratings_breakdown AS
  SELECT rating, count(*)
  FROM reviews
  GROUP BY product_id, rating;
```



```CREATE VIEW ratings_breakdown AS
  SELECT rating, count(*)
  FROM reviews
  GROUP BY product_id, rating;
```

```sql
select TO_CHAR(TO_TIMESTAMP(date / 1000), 'DD/MM/YYYY HH24:MI:SS') date from reviews limit 1;
```

## 

```sql
EXPLAIN ANALYZE
select * from reviews 
where reported = false
order by helpfulness desc
limit 5
offset 5;
```

 **This is a second time running**

Limit  (cost=331815.95..331816.53 rows=5 width=320) (actual time=6735.559..6737.004 rows=5 loops=1)
   ->  Gather Merge  (cost=331815.36..864916.58 rows=4569120 width=320) (actual time=6735.518..6737.000 rows=10 loops=1)
         Workers Planned: 2
         Workers Launched: 2
         ->  Sort  (cost=330815.34..336526.74 rows=2284560 width=320) (actual time=6726.899..6726.900 rows=10 loops=3)
               Sort Key: helpfulness DESC
               Sort Method: top-N heapsort  Memory: 32kB
               Worker 0:  Sort Method: top-N heapsort  Memory: 31kB
               Worker 1:  Sort Method: top-N heapsort  Memory: 33kB
               ->  Parallel Seq Scan on reviews  (cost=0.00..281446.82 rows=2284560 width=320) (actual time=0.055..6303.669 rows=1828448 loops=3)
                     Filter: (NOT reported)
                     Rows Removed by Filter: 96536
 Planning Time: 0.481 ms
 Execution Time: 6737.031 ms
(14 rows)



```sql
EXPLAIN ANALYZE
select * from 
(
  select * from reviews
  where reported = false
  limit 5
  offset 5
) AS foo
order by helpfulness desc;                                                    
```
-------------------------------------------------------------------------------------------------------------------------
**This is a second time running**: much faster than first time

 Sort  (cost=0.68..0.70 rows=5 width=320) (actual time=0.023..0.024 rows=5 loops=1)
   Sort Key: reviews.helpfulness DESC
   Sort Method: quicksort  Memory: 26kB
   ->  Limit  (cost=0.29..0.57 rows=5 width=320) (actual time=0.014..0.016 rows=5 loops=1)
         ->  Seq Scan on reviews  (cost=0.00..315130.57 rows=5482944 width=320) (actual time=0.010..0.013 rows=10 loops=1)
               Filter: (NOT reported)
 Planning Time: 0.094 ms
 Execution Time: 0.045 ms
(8 rows)

## Aug 12, 2021

focous on create the API

- Initialize your API server

  - Build out the framework for your service
  - Setup your server-side application and related tools
  - *Consider using Docker to build and deploy your service*

  

  Performance Testing your Service

  AWS the production mode

  what's the most critital request for the API? -> reviews

  

New Relic one, api key - ingest license

K6  -> stress test locally 

once depoly in AWS, using loader.io

```sql
SELECT characteristic_id, "value" from characteristic_reviews 
INNER JOIN characteristics 
ON characteristic_reviews.id = characteristics.id
WHERE characteristics.product_id = 1;

```

when post a new review:

- update the review table
- How can I get the current unix epoch timestamp
- update the reviews_photos table, how can i get the review id



Completed:

- create  MATERIALIZED VIEW for the aggreate review meta datas

```sql
CREATE MATERIALIZED VIEW reviews_meta_ratings AS
SELECT product_id, rating, COUNT(id)
FROM reviews
GROUP BY product_id, rating;

CREATE MATERIALIZED VIEW reviews_meta_recommended AS
SELECT product_id, recommend, COUNT(id)
FROM reviews
GROUP BY product_id, recommend;

CREATE MATERIALIZED VIEW reviews_meta_characteristics AS
SELECT product_id, characteristic_id, "name", AVG("value") AS "value"
FROM characteristics
INNER JOIN characteristic_reviews
ON characteristic_reviews.characteristic_id = characteristics.id
GROUP BY product_id, characteristic_id, "name";
```

-> **need to improve, using nested json to form the results**

## Aug 13, 2021

### Planning

1. Using nested data to form the review_meta
2. Using nested data for the photos
3. change endpoint to fetch data from current API
4. Explore how to do page, naive way try offset, 
   - does offset will reduce the query exectution time?

```sql
SELECT json
(SELECT row_to_json(nested_ratings)
FROM (
  select rating, "count"
  From
  reviews_meta_ratings) as nested_ratings);
  
  output:
 [{"rating":4,"count":1},  +
 {"rating":5,"count":1},  +
  {"rating":2,"count":1},  +
  {"rating":3,"count":1},  +
```

```sql
SELECT json_objecr_keys (ratings -> 'rating')
from
(SELECT row_to_json(nested_ratings)
FROM (
  select rating, "count"
  From
  reviews_meta_ratings) as nested_ratings
 ) AS ratings;
  
  
  
SELECT row_to_json(nested_recommended)
FROM (
  select recommend, "count"
  From
  reviews_meta_recommended) as nested_recommended;
```

```sql
select
        json_build_object(
                'id', u.id,
                'name', u.name,
                'email', u.email,
                'user_role_id', u.user_role_id,
                'user_role', json_build_object(
                        'id', ur.id,
                        'name', ur.name,
                        'description', ur.description,
                        'duty_id', ur.duty_id,
                        'duty', json_build_object(
                                'id', d.id,
                                'name', d.name
                        )
                )
    )
from users u
inner join user_roles ur on ur.id = u.user_role_id
inner join role_duties d on d.id = ur.duty_id;
```

```sql
(SELECT * 
from reviews
WHERE product_id = $1 and reported= false LIMIT 5) as a
inner join
(SELECT * 
from photos
WHERE product_id = $1 and reported= false LIMIT 5) as a



SELECT row_to_json(nested_photos)
FROM (
  select *
  FROM reviews_photo
  Where review_id = 1
  LIMIT 5
  
) as nested_photos;
```

```sql
SELECT product_id, json_agg(json_build_object('rating', rating,
                                              'count', "count"))
FROM reviews_meta_ratings
GROUP BY product_id;


# ouput
384 | [{"rating" : 1, "count" : 1}, {"rating" : 3, "count" : 1}, {"rating" : 4, "count" : 1}]
```

```sql
SELECT product_id, json_agg(json_build_object(rating, "count")) AS ratings
FROM reviews_meta_ratings
GROUP BY product_id;

#output
384 | [{"1" : 1}, {"3" : 1}, {"4" : 1}]

```

```sql
SELECT product_id, json_agg(json_build_object(recommend, "count")) as recommended
FROM reviews_meta_recommended
GROUP BY product_id;
#output
 1 | [{"false" : 1}, {"true" : 1}]
```

```sql
SELECT product_id, "name", json_agg(json_build_object(characteristic_id, "value")) AS characteristics
FROM reviews_meta_characteristics
GROUP BY product_id, "name";

#output

 1 | Comfort | [{"3" : 5.0000000000000000}]
384 | [{"1314" : 2.0000000000000000}, {"1315" : 2.3333333333333333}, {"1316" : 2.0000000000000000}, {"1317" : 4.3333333333333333}]
```

```sql
SELECT product_id, json_agg(json_build_object("name", characteristics))
FROM (SELECT product_id, "name", json_agg(json_build_object(characteristic_id, "value")) AS characteristics
FROM reviews_meta_characteristics
GROUP BY product_id, "name") as c
GROUP BY product_id;

# output
1 | [{"Comfort" : [{"3" : 5.0000000000000000}]}, {"Fit" : [{"1" : 4.0000000000000000}]}, {"Length" : [{"2" : 3.5000000000000000}]}, {"Quality" : [{"4" : 4.0000000000000000}]}]
```

```sql
SELECT product_id, json_agg(json_build_object("name",  json_agg(json_build_object(characteristic_id, "value"))))
FROM reviews_meta_characteristics
GROUP BY product_id;
# ERROR:  aggregate function calls cannot be nested
```

```sql
SELECT product_id, json_agg(json_build_object("name", characteristics))
FROM (SELECT product_id, "name", json_agg(json_build_object(characteristic_id, "value")) AS characteristics
FROM (SELECT product_id, characteristic_id, "name", AVG("value") AS "value"
FROM characteristics
INNER JOIN characteristic_reviews
ON characteristic_reviews.characteristic_id = characteristics.id
GROUP BY product_id, characteristic_id, "name") AS a
GROUP BY product_id, "name") as b
GROUP BY product_id;
```

```sql
(select * from reviews_meta_ratings) UNION ALL (select * from reviews_meta_recommended)
Order by product_id;
```



```sql
SELECT product_id, json_object_agg(rating, "count") AS ratings
FROM (SELECT product_id, rating, COUNT(id)
FROM reviews
GROUP BY product_id, rating) AS r
GROUP BY product_id;
```

```
SELECT product_id, json_object_agg(recommend, "count") AS recommended
FROM (SELECT product_id, recommend, COUNT(id)
FROM reviews
GROUP BY product_id, recommend) AS r
GROUP BY product_id;
```

```sql
SELECT product_id, json_object_agg("name", characteristics) AS characteristics
FROM (SELECT product_id, "name", json_object_agg(characteristic_id, "value") AS characteristics
FROM (SELECT product_id, characteristic_id, "name", AVG("value") AS "value"
FROM characteristics
INNER JOIN characteristic_reviews
ON characteristic_reviews.characteristic_id = characteristics.id
GROUP BY product_id, characteristic_id, "name") AS a
GROUP BY product_id, "name") as b
GROUP BY product_id;
```



```sql
SELECT product_id, json_object_agg("name", characteristics) AS characteristics
FROM (
  SELECT product_id, "name", json_agg(select characteristic_id, "value" from characteristic_reviews) 
  AS characteristics
	FROM (SELECT product_id, characteristic_id, "name", AVG("value") AS ch_value
				FROM characteristics
				INNER JOIN characteristic_reviews
				ON characteristic_reviews.characteristic_id = characteristics.id
				GROUP BY product_id, characteristic_id, "name") AS a
GROUP BY product_id, "name") as b
GROUP BY product_id;
```

```sql
SELECT product_id, json_object_agg("name", json_build_object('id', characteristic_id, 'value', "value")) AS characteristics
FROM (SELECT product_id, characteristic_id, "name", AVG("value") AS "value"
FROM characteristics
INNER JOIN characteristic_reviews
ON characteristic_reviews.characteristic_id = characteristics.id
GROUP BY product_id, characteristic_id, "name") AS a
GROUP BY product_id;
```



