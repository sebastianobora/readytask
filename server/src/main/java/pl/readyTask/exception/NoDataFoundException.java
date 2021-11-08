package pl.readyTask.exception;

public class NoDataFoundException extends RuntimeException {
    public NoDataFoundException(String dataSource, Object value) {
        super(ExceptionsMessages.getNoDataFoundMessage(dataSource, value));
    }
    public NoDataFoundException(String dataSource) {
        super(ExceptionsMessages.getNoDataFoundMessage(dataSource));
    }
}
