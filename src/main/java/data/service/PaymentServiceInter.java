package data.service;

import data.dto.PaymentDto;

public interface PaymentServiceInter {
    public void insertPayment(PaymentDto dto, String imp_uid);
}
