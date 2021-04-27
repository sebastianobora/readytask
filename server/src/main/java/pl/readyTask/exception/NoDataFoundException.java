package pl.readyTask.exception;

public class NoDataFoundException extends RuntimeException{
    public NoDataFoundException(String dataSource, Object value){
        super("Can't find data in '" + dataSource + "' with value " + value);
    }
}
