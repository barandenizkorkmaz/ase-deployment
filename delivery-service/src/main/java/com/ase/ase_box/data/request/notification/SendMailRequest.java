package com.ase.ase_box.data.request.notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SendMailRequest {
    private String receiver;

    private String title = "Ase Delivery Status";

    private String content;

}
