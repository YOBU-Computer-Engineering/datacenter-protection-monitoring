package com.example.accessingdatamysql.core.utilities.results;

public class SuccessResult extends Result{

	public SuccessResult() {
		super(true);
		// TODO Auto-generated constructor stub
	}
	
	public SuccessResult(String message) {
		super(true, message);
	}
	
}
