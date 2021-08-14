

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

# list the table_id_seq
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

 Schema |             Name             |       Type        | Owner | Persistence |  Size  | Description 
--------+------------------------------+-------------------+-------+-------------+--------+-------------
 public | reviews_meta_characteristics | materialized view | me    | permanent   | 220 MB | 
 public | reviews_meta_ratings         | materialized view | me    | permanent   | 64 MB  | 
 public | reviews_meta_recommended     | materialized view | me    | permanent   | 53 MB  | 
(3 rows)

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

1. ~~Using nested data to form the review_meta~~
2. ~~Using nested data for the photos~~
3. ~~change endpoint to fetch data from current API~~
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
## get nested [{'id': 1, 'url': 'www.image.com'}]
SELECT review_id, json_agg(json_build_object('id', id, 'url', "url") )
FROM reviews_photo
GROUP BY review_id;
```



```sql
# Create a function to get reviews by page number
CREATE FUNCTION getReviewsByPageNumberAndSize(
 PageNumber INTEGER = 0,
 PageSize INTEGER = 5, 
 Sort  text ='relevant',
 )
 RETURNS SETOF public.reviews 
 LANGUAGE plpgsql
 AS
 $$
 DECLARE
  PageOffset INTEGER :=0;
 BEGIN
  PageOffset := ((PageNumber-1) * PageSize);
 
  RETURN QUERY
   SELECT *
   FROM public.reviews
   OFFSET PageOffset;
   FETCH NEXT PageSize ROWS ONLY;
END;
$$;

```







# Improvements

- compare generate a whole materlizze view (join all the materlize view) or seperate
  - Storage for 3 seperate views: 200MB + 64MB + 53MB
  - Storage for 1 view: 274 MB 

```sql
CREATE MATERIALIZED VIEW reviews_meta AS
SELECT t1.product_id, t1.ratings, t2.recommended, t3.characteristics
FROM (
    SELECT product_id, json_object_agg(rating, "count") AS ratings
    FROM (SELECT product_id, rating, COUNT(id)
    FROM reviews
    GROUP BY product_id, rating) AS r
    GROUP BY product_id
) AS t1
INNER JOIN (
  SELECT product_id, json_object_agg(recommend, "count") AS recommended
  FROM (SELECT product_id, recommend, COUNT(id)
  FROM reviews
  GROUP BY product_id, recommend) AS r
  GROUP BY product_id
) AS t2 ON t1.product_id = t2.product_id
INNER JOIN (
    SELECT product_id, json_object_agg("name", json_build_object('id', characteristic_id, 'value', "value")) AS characteristics
  FROM (SELECT product_id, characteristic_id, "name", AVG("value") AS "value"
  FROM characteristics
  INNER JOIN characteristic_reviews
  ON characteristic_reviews.characteristic_id = characteristics.id
  GROUP BY product_id, characteristic_id, "name") AS a
  GROUP BY product_id
) AS t3 ON t3.product_id = t1.product_id;

```

By combine to one view, it speed up the response

```sql
EXPLAIN ANALYZE
SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness 
FROM reviews INNER JOIN reviews_photo ON reviews.id = reviews_photo.review_id
WHERE product_id = 1 and reported = false  
LIMIT 5;                                                                
```

--------------------------------------------------------------------------------------------------------------------------------------------
 Limit  (cost=130540.90..195363.75 rows=5 width=292) (actual time=13346.425..13346.470 rows=0 loops=1)
   ->  Hash Join  (cost=130540.90..428726.01 rows=23 width=292) (actual time=13346.420..13346.465 rows=0 loops=1)
         Hash Cond: (reviews.id = reviews_photo.review_id)
         ->  Gather  (cost=1000.00..288466.58 rows=48 width=292) (actual time=0.733..10804.103 rows=2 loops=1)
               Workers Planned: 2
               Workers Launched: 2
               ->  Parallel Seq Scan on reviews  (cost=0.00..287461.78 rows=20 width=292) (actual time=4448.353..12405.541 rows=1 loops=3)
                     Filter: ((NOT reported) AND (product_id = 1))
                     Rows Removed by Filter: 1924983
         ->  Hash  (cost=84544.18..84544.18 rows=2742618 width=4) (actual time=2470.258..2470.258 rows=2742540 loops=1)
               Buckets: 131072  Batches: 64  Memory Usage: 2525kB
               ->  Seq Scan on reviews_photo  (cost=0.00..84544.18 rows=2742618 width=4) (actual time=6.030..1410.689 rows=2742540 loops=1)
 Planning Time: 2.623 ms
 Execution Time: 13347.102 ms
(14 rows)

```sql

DROP VIEW IF EXISTS reviews_view;
CREATE VIEW reviews_view AS
SELECT product_id, json_agg(json_build_object(
  'review_id', review_id,
  'rating', rating, 
  'summary', summary, 
  'recommend', recommend, 
  'response', response, 
  'body', body, 
  'date', "date",
  'reviewer_name', reviewer_name, 
  'helpfulness', helpfulness, 
  'photo', photo)) as results
FROM reviews
LEFT JOIN (SELECT review_id, json_agg(json_build_object('id', id, 'url', "url")) as photo
FROM reviews_photo
GROUP BY review_id) as t
ON reviews.id = t.review_id
GROUP BY product_id;
```

​	



```sql
SELECT product_id AS product, json_agg(json_build_object(
  'review_id', id,
  'rating', rating,
  'summary', summary,
  'recommend', recommend,
  'response', response,
  'body', body,
  'date', "date",
  'reviewer_name', reviewer_name,
  'helpfulness', helpfulness,
  'photo', COALESCE(photo, '[]'::json)))as results
FROM reviews
LEFT JOIN (SELECT review_id, json_agg(json_build_object('id', id, 'url', "url")) as photo
FROM reviews_photo
Where review_id = 1
GROUP BY review_id) as t
ON reviews.id = t.review_id
GROUP BY product_id;
```

```sql
# How to fix PostgreSQL error "duplicate key violates unique constraint"
# set the serial nextval
SELECT MAX(id) FROM reviews;
select nextval('reviews_id_seq');
BEGIN;
LOCK TABLE reviews IN EXCLUSIVE MODE;
SELECT setval('reviews_id_seq', COALESCE((SELECT MAX(id)+1 FROM reviews), 1), false);
COMMIT;
```



# Testing

### 1. Get Metadata

```sql
# get metadata
EXPLAIN ANALYZE
SELECT * FROM reviews_meta WHERE product_id = 13023;
                                                           
                                           QUERY PLAN    Aug 14, 2021                                                        
---------------------------------------------------------------------------------------------
 Gather  (cost=1000.00..41017.08 rows=1 width=260) (actual time=40.265..1506.471 rows=1 loops=1)
   Workers Planned: 2
   Workers Launched: 2
   ->  Parallel Seq Scan on reviews_meta  (cost=0.00..40016.98 rows=1 width=260) (actual time=1012.268..1500.482 rows=0 loops=3)
         Filter: (product_id = 13023)
         Rows Removed by Filter: 316690
 Planning Time: 0.069 ms
 Execution Time: 1506.488 ms
(8 rows)
```

### 2. Get Reviews

- Using view

````sql
# get reviews
EXPLAIN ANALYZE
SELECT * from reviews_view WHERE product = 13027 LIMIT 5 OFFSET 10;


Query Plan on Aug 14, 2021
---------------------------------------------------------------------------------------------
 Limit  (cost=499420.50..578245.31 rows=5 width=36) (actual time=37207.100..37222.995 rows=0 loops=1)
   ->  GroupAggregate  (cost=341770.87..1130018.49 rows=50 width=36) (actual time=37207.094..37222.988 rows=1 loops=1)
         Group Key: reviews.product_id
         ->  Merge Left Join  (cost=341770.87..1130017.49 rows=50 width=328) (actual time=28934.062..37222.251 rows=6 loops=1)
               Merge Cond: (reviews.id = reviews_photo.review_id)
               ->  Gather Merge  (cost=1000.46..380688.57 rows=50 width=296) (actual time=23027.249..23034.954 rows=6 loops=1)
                     Workers Planned: 2
                     Workers Launched: 2
                     ->  Parallel Index Scan using reviews_pkey on reviews  (cost=0.43..379682.77 rows=21 width=296) (actual time=15356.585..15359.018 rows=2 loops=3)
                           Filter: (product_id = 13027)
                           Rows Removed by Filter: 1924982
               ->  GroupAggregate  (cost=340770.41..715045.84 rows=2742618 width=36) (actual time=5314.561..13907.810 rows=2742534 loops=1)
                     Group Key: reviews_photo.review_id
                     ->  Gather Merge  (cost=340770.41..660193.48 rows=2742618 width=136) (actual time=5306.634..6683.894 rows=2742540 loops=1)
                           Workers Planned: 2
                           Workers Launched: 2
                           ->  Sort  (cost=339770.39..342627.29 rows=1142758 width=136) (actual time=5006.282..5296.457 rows=914180 loops=3)
                                 Sort Key: reviews_photo.review_id
                                 Sort Method: external merge  Disk: 136656kB
                                 Worker 0:  Sort Method: external merge  Disk: 105376kB
                                 Worker 1:  Sort Method: external merge  Disk: 150464kB
                                 ->  Parallel Seq Scan on reviews_photo  (cost=0.00..68545.57 rows=1142758 width=136) (actual time=4.500..3270.560 rows=914180 loops=3)
 Planning Time: 34.927 ms
 Execution Time: 37307.789 ms
(24 rows)
````

- Subquery

  ```sql
  # get reviews
  EXPLAIN ANALYZE
  SELECT product_id AS product, json_agg(json_build_object(
    'review_id', id,
    'rating', rating,
    'summary', summary,
    'recommend', recommend,
    'response', response,
    'body', body,
    'date', "date",
    'reviewer_name', reviewer_name,
    'helpfulness', helpfulness,
    'photos', COALESCE(photos, '[]'::json))) as results
  FROM (SELECT id, product_id, rating, summary, body, "date", reviewer_name, helpfulness
        FROM reviews 
        WHERE product_id = 13027 && reported = false)  AS t1
   LEFT JOIN (SELECT * FROM reviews_photo)
   
  ```

- using function to fetch reviews by page

  ```sql
  CREATE OR REPLACE FUNCTION getReviewsByPage(
   Product INTEGER,
   PageNumber INTEGER DEFAULT 1,
   PageSize INTEGER DEFAULT 5,
   Sort VARCHAR DEFAULT 'id'
   )
   RETURNS TABLE(review_id int, rating int, summary text, recommend bool, response text, date bigint, reviewer_name varchar, helpfulness int) AS
   $BODY$
   DECLARE
    PageOffset INTEGER :=0;
   BEGIN
  
    PageOffset := ((PageNumber-1) * PageSize);
  
    RETURN QUERY
     SELECT id as review_id, rating, summary, recommend, response, "date", reviewer_name, helpfulness
     FROM public.reviews
     WHERE product_id = Product AND reported = false
     ORDER BY Sort
     LIMIT Pagesize
     OFFSET PageOffset;
  END;
  $BODY$
  LANGUAGE plpgsql;
  ```

  ```sql
  EXPLAIN ANALYZE
  SELECT * from getReviewsByPage(13023);
                                                                                                          
  ----------------------------------------------------------------------------------------
   Function Scan on getreviewsbypage  (cost=0.25..10.25 rows=1000 width=558) (actual time=4045.050..4045.051 rows=3 loops=1)
   Planning Time: 0.052 ms
   Execution Time: 4045.522 ms
  (3 rows)
  
  ```

  ```sql
    SELECT product_id AS product, json_agg(json_build_object(
    'review_id', id,
    'rating', rating,
    'summary', summary,
    'recommend', recommend,
    'response', response,
    'body', body,
    'date', "date",
    'reviewer_name', reviewer_name,
    'helpfulness', helpfulness)) as results
    FROM getreviewsbypage(13027)
    GROUP BY product_id;
  ```

  

```sql
CREATE OR REPLACE FUNCTION getReviewsByPage(
 Product INTEGER,
 PageNumber INTEGER DEFAULT 1,
 PageSize INTEGER DEFAULT 5,
 Sort VARCHAR DEFAULT 'id'
 )
 RETURNS json AS
 $BODY$
 DECLARE
  PageOffset INTEGER :=0;
 BEGIN

  PageOffset := ((PageNumber-1) * PageSize);
  RETURN QUERY
  SELECT json_agg(json_build_object(
  'review_id', id,
  'rating', rating,
  'summary', summary,
  'recommend', recommend,
  'response', response,
  'body', body,
  'date', "date",
  'reviewer_name', reviewer_name,
  'helpfulness', helpfulness,
  'photos', COALESCE(photos, '[]'::json)))
FROM 
(select id, rating, summary, recommend, body, response, "date", reviewer_name, helpfulness 
 from reviews 
 where product_id = Product AND reported = false
 ORDER BY Sort DESC
) AS t1
LEFT JOIN (SELECT review_id, json_agg(json_build_object('id', id, 'url', "url")) as photos
FROM reviews_photo
GROUP BY review_id) as t2
ON t1.id = t2.review_id
LIMIT Pagesize
OFFSET PageOffset;
END;
$BODY$
LANGUAGE plpgsql;
```

```sql
select getReviewsByPage(13027);
select * from getReviewsByPage(13027);
```

