USE testClient;

CREATE PROCEDURE usp_getMarkerByRange
@index_start INT,
@index_end INT
AS
SELECT *
FROM (SELECT ROW_NUMBER() OVER(ORDER BY (select NULL as noorder)) AS RowNum, *
      FROM MARKER
     ) as alias
WHERE RowNum BETWEEN @index_start AND @index_end;