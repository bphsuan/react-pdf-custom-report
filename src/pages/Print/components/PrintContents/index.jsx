import React from 'react'
import { Document, Page, Text, StyleSheet, Font, View, Image } from '@react-pdf/renderer'
import JhengHei from '../../../../assets/fonts/MicrosoftJhengHeiRegular.ttf'
import JhengHeiBold from '../../../../assets/fonts/MicrosoftJhengHeiBold.ttf'
import moment from 'moment'
import JsBarcode from 'jsbarcode'
import { numberComma } from '../../../../services/numberHelper.service'
import logoUrl from '../../../../assets/print_logo.png'
import PrintI18n from '../../../../i18n/print.i18n.json'

const PrintContent = ({ profile, locale }) => {
  console.log(profile)
  const getTranslation = key => {
    return locale ? PrintI18n[locale][key] : PrintI18n['1'][key]
  }

  let AUFNRCanvas
  AUFNRCanvas = document.createElement('canvas')
  JsBarcode(AUFNRCanvas, `^W${profile?.header?.AUFNR}`, { displayValue: false })
  const AUFNRBarcode = AUFNRCanvas.toDataURL()

  let PLNBEZCanvas
  PLNBEZCanvas = document.createElement('canvas')
  JsBarcode(PLNBEZCanvas, `^M${profile?.header?.PLNBEZ}`, { displayValue: false })
  const PLNBEZBarcode = PLNBEZCanvas.toDataURL()

  return (
    // <PDFViewer width="1000" height="600">
    <Document>
      <Page style={styles.body} size="A4">
        <View style={styles.completeCheck}>
          <View style={styles.completeCheckbox} />
          <Text style={styles.completeText}>{getTranslation('Complete')}</Text>
        </View>

        {/* --表頭-- */}
        <View style={styles.header} fixed>
          <View style={styles.logoBorder}>
            <View style={styles.logo}>
              <Image style={{ maxWidth: '100%', maxHeight: '100%' }} src={logoUrl} />
            </View>
          </View>
          <View style={styles.PRT}>
            <Text style={[styles.large_context, styles.PRT_context, { marginBottom: 2 }]}>
              {getTranslation('ObjectList')}
            </Text>
            <Text style={[styles.regular_content, styles.center, { bottom: 1 }]}>
              {profile?.header?.PRT}
            </Text>
          </View>
          <View style={styles.PLNBEZ}>
            <Text style={[styles.regular_context, styles.topLeft]}>{getTranslation('MaterialNO')}</Text>
            <Text
              style={[
                styles.large_content,
                styles.center,
                { fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto' }
              ]}
            >
              {profile?.header?.PLNBEZ}
            </Text>
          </View>
          <View style={styles.MAT_STXT}>
            <Text style={[styles.regular_context, styles.topLeft]}>
              {getTranslation('MaterialDescription')}
            </Text>
            <View style={{ height: 27 }}>
              <Text style={[styles.regular_content, styles.center, { margin: 'auto 3' }]}>
                {profile?.header?.MAT_STXT}
              </Text>
            </View>
          </View>
          <View style={styles.AUFNR}>
            <Text style={[styles.regular_context, styles.topLeft]}>{getTranslation('OrderNO')}</Text>
            <View style={{ height: 27 }}>
              <Text
                style={[
                  styles.regular_content,
                  styles.center,
                  { marginTop: 'auto', marginBottom: 'auto' }
                ]}
              >
                {profile?.header?.AUFNR}
              </Text>
            </View>
          </View>
          <View style={styles.GMEIN}>
            <Text style={[styles.regular_context, styles.topLeft]}>
              {getTranslation('OrderQuantity')}
            </Text>
            <View style={{ height: 27 }}>
              <Text
                style={[
                  styles.regular_content,
                  styles.right,
                  { marginRight: 5, marginTop: 'auto', marginBottom: 'auto' }
                ]}
              >
                {numberComma(profile?.header?.GAMNG)} {profile?.header?.GMEIN}
              </Text>
            </View>
          </View>
          <View style={styles.DISPO}>
            <Text style={[styles.regular_context, styles.topLeft]}>
              {getTranslation('MRPcontroller')}
            </Text>
            <View
              style={{
                bottom: 1,
                marginTop: 2,
                height: 30,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={[styles.regular_content, styles.center]}>{profile?.header?.DISPO}</Text>
              <Text style={[styles.regular_content, styles.center]}>
                {profile?.header?.TXT_DISPO}
              </Text>
            </View>
          </View>
          <View style={styles.FEVOR}>
            <Text style={[styles.regular_context, styles.topLeft]}>
              {getTranslation('ProdScheduler')}
            </Text>
            <View
              style={{
                bottom: 1,
                marginTop: 2,
                height: 30,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={[styles.regular_content, styles.center]}>{profile?.header?.FEVOR}</Text>
              <Text style={[styles.regular_content, styles.center]}>
                {profile?.header?.TXT_FEVOR}
              </Text>
            </View>
          </View>
          <View style={styles.AUART}>
            <Text style={[styles.regular_context, styles.topLeft]}>{getTranslation('OrderClass')}</Text>
            <View
              style={{
                bottom: 1,
                marginTop: 2,
                height: 30,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={[styles.regular_content, styles.center]}>{profile?.header?.AUART}</Text>
              <Text style={[styles.regular_content, styles.center]}>
                {profile?.header?.TXT_AUART}
              </Text>
            </View>
          </View>
          <View style={styles.GSTRS}>
            <Text style={[styles.regular_context, styles.topLeft]}>{getTranslation('Beginning')}</Text>
            <View
              style={{
                marginTop: 2,
                height: 30,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={[styles.regular_content, styles.center]}>
                {moment(profile?.header?.GSTRS).format('YYYY/MM/DD')}
              </Text>
            </View>
          </View>
          <View style={styles.GLTRS}>
            <Text style={[styles.regular_context, styles.topLeft]}>{getTranslation('Finish')}</Text>
            <View
              style={{
                marginTop: 2,
                height: 30,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={[styles.regular_content, styles.center]}>
                {moment(profile?.header?.GLTRS).format('YYYY/MM/DD')}
              </Text>
            </View>
          </View>
          <View style={[styles.STTXT]}>
            <Text style={[styles.regular_context, styles.topLeft]}>{getTranslation('Status')}</Text>
            <View
              style={{
                marginTop: 2,
                height: 30,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={[styles.regular_content, styles.center, { marginLeft: 3 }]}>
                {profile?.header?.STTXT}
              </Text>
            </View>
          </View>
          <View style={styles.WERKS}>
            <Text style={[styles.regular_context, styles.topLeft]}>{getTranslation('Factory')}</Text>
            <View
              style={{
                bottom: 1,
                marginTop: 2,
                height: 30,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={[styles.regular_content, styles.center]}>{profile?.header?.WERKS}</Text>
              <Text style={[styles.regular_content, styles.center]}>
                {profile?.header?.TXT_WERK}
              </Text>
            </View>
          </View>
          <View style={styles.RSNUM}>
            <Text style={[styles.regular_context, styles.topLeft]}>
              {getTranslation('ReservationNO')}
            </Text>
            <View
              style={{
                marginTop: 2,
                height: 30,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={[styles.regular_content, styles.center]}>{profile?.header?.RSNUM}</Text>
            </View>
          </View>
          <View style={styles.ERDAT}>
            <Text style={[styles.regular_context, styles.topLeft]}>
              {getTranslation('CreationDate')}
            </Text>
            <View
              style={{
                marginTop: 2,
                height: 30,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={[styles.regular_content, styles.center]}>
                {moment(profile?.header?.ERDAT).format('YYYY/MM/DD')}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: '-197' }}>
          <View style={styles.AUFNRBarCode}>
            <Text style={[styles.regular_context, styles.topLeft]}>{getTranslation('OrderNO')}</Text>
            <View style={styles.AUFNRBarCode_content}>
              {profile?.header?.AUFNR ? (
                <Image style={styles.AUFNRBarCode_content_Img} src={AUFNRBarcode} />
              ) : (
                <></>
              )}
            </View>
          </View>
          <View style={styles.PLNBEZBarCode}>
            <Text style={[styles.regular_context, styles.topLeft]}>{getTranslation('MaterialNO')}</Text>
            <View style={styles.PLNBEZBarCode_content}>
              {profile?.header?.PLNBEZ ? (
                <Image style={styles.PLNBEZBarCode_content_Img} src={PLNBEZBarcode} />
              ) : (
                <></>
              )}
            </View>
          </View>
          <View style={styles.ROUT_STXT}>
            <Text style={[styles.regular_context, styles.topLeft]}>{getTranslation('OurneyInfo')}</Text>
            <Text style={[styles.regular_content, styles.left, { marginLeft: 35, marginTop: 1 }]}>
              {profile?.header?.ROUT_STXT}
            </Text>
          </View>
        </View>
        {/* --表頭-- */}

        {/* --表身-- */}
        {Object.keys(profile?.body1)?.map((orderCount, key) => {
          if (key === 0) {
            return (
              <View style={{ marginTop: 290 }}>
                <View>
                  <View style={styles.OrderTitle} wrap={false}>
                    <Text
                      style={[
                        styles.OrderCount,
                        styles.regular_content,
                        styles.left,
                        { marginLeft: 5, marginVertical: 'auto' }
                      ]}
                    >
                      {getTranslation('Order')} {Number(orderCount)}
                    </Text>
                  </View>
                  <View style={styles.table}>
                    <View style={[styles.row]} wrap={false}>
                      <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 0.5 }]}>
                        <Text style={[styles.regular_context, styles.topCenter]}>
                          {getTranslation('OrderType')}
                        </Text>
                        <Text style={[styles.regular_content, styles.center]}>
                          {profile?.body1[orderCount][0]?.SEQ_TXT}
                        </Text>
                      </View>
                      <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 0.5 }]}>
                        <Text style={[styles.regular_context, styles.topCenter]}>
                          {getTranslation('ReferenceOrder')}
                        </Text>
                        <Text style={[styles.regular_content, styles.center]}>
                          {profile?.body1[orderCount][0]?.BEZFL}
                        </Text>
                      </View>
                      <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 0.5 }]}>
                        <Text style={[styles.regular_context, styles.topCenter]}>
                          {getTranslation('StartWork')}
                        </Text>
                        <Text style={[styles.regular_content, styles.center]}>
                          {profile?.body1[orderCount][0]?.VORNR1 === 0
                            ? ''
                            : profile?.body1[orderCount][0]?.VORNR1}
                        </Text>
                      </View>
                      <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 0.5 }]}>
                        <Text style={[styles.regular_context, styles.topCenter]}>
                          {getTranslation('EndJob')}
                        </Text>
                        <Text style={[styles.regular_content, styles.center]}>
                          {profile?.body1[orderCount][0]?.VORNR2 === 0
                            ? ''
                            : profile?.body1[orderCount][0]?.VORNR2}
                        </Text>
                      </View>
                      <View
                        style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 0.5 }]}
                      ></View>
                      <View
                        style={[styles.cell, { borderRightWidth: 1, borderBottomWidth: 0.5 }]}
                      ></View>
                    </View>
                  </View>
                </View>
                {profile?.body1[orderCount].map((item, key) => (
                  <View>
                    <View style={styles.OrderItemTitle} wrap={false}>
                      <Text
                        style={[
                          styles.OrderItemText,
                          styles.regular_content,
                          styles.left,
                          { marginLeft: 5 }
                        ]}
                      >
                        {getTranslation('Operation')} {item?.VORNR} {getTranslation('Order')}{' '}
                        {Number(orderCount)}
                      </Text>
                    </View>
                    <View style={styles.table}>
                      <View style={[styles.row]} wrap={false}>
                        <View
                          style={[
                            styles.cell,
                            { borderLeftWidth: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5 }
                          ]}
                        >
                          <Text style={[styles.regular_context, styles.topCenter]}>
                            {getTranslation('WorkCenter')}
                          </Text>
                          <Text style={[styles.regular_content, { margin: 'auto' }]}>
                            {item?.ARBPL}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.cell,
                            {
                              borderLeftWidth: 1,
                              borderBottomWidth: 0.5,
                              borderTopWidth: 0.5,
                              flexBasis: '75'
                            }
                          ]}
                        >
                          <Text style={[styles.regular_context, styles.topCenter]}>
                            {getTranslation('Factory')}
                          </Text>
                          <Text style={[styles.regular_content, { margin: 'auto' }]}>
                            {item?.WERKS}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.cell,
                            {
                              borderLeftWidth: 1,
                              borderBottomWidth: 0.5,
                              borderTopWidth: 0.5,
                              flexBasis: '275'
                            }
                          ]}
                        >
                          <Text style={[styles.regular_context, styles.topCenter]}>
                            {getTranslation('Description')}
                          </Text>
                          <Text style={[styles.regular_content, styles.left, { marginLeft: 5 }]}>
                            {item?.LTXA1}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.cell,
                            { borderLeftWidth: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5 }
                          ]}
                        >
                          <Text style={[styles.regular_context, styles.topCenter]}>
                            {getTranslation('Beginning')}
                          </Text>
                          <Text style={[styles.regular_content, { margin: 'auto' }]}>
                            {item?.SSAVD?.replaceAll('-', '/')}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.cell,
                            { borderLeftWidth: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5 }
                          ]}
                        >
                          <Text style={[styles.regular_context, styles.topCenter]}>
                            {getTranslation('Finish')}
                          </Text>
                          <Text style={[styles.regular_content, { margin: 'auto' }]}>
                            {item?.SSELD?.replaceAll('-', '/')}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.cell,
                            {
                              borderLeftWidth: 1,
                              borderRightWidth: 1,
                              borderBottomWidth: 0.5,
                              borderTopWidth: 0.5
                            }
                          ]}
                        >
                          <Text style={[styles.regular_context, styles.topCenter]}>
                            {getTranslation('ConfirmNO')}
                          </Text>
                          <Text style={[styles.regular_content, { margin: 'auto' }]}>
                            {item?.RUECK}
                          </Text>
                        </View>
                      </View>
                      {profile?.body2[item?.VORNR] && (
                        <View>
                          <View style={styles.VORNRItemTitle} wrap={false}>
                            <Text
                              style={[
                                styles.VORNRItemText,
                                styles.regular_content,
                                styles.left,
                                { marginLeft: 5 }
                              ]}
                            >
                              {getTranslation('Element')} {item?.VORNR} {getTranslation('Order')}{' '}
                              {Number(orderCount)}
                            </Text>
                          </View>
                          <View style={styles.table}>
                            {/* row-header */}
                            <View style={[styles.row]} wrap={false}>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    borderLeftWidth: 1,
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5,
                                    flexBasis: '60'
                                  }
                                ]}
                              >
                                <Text style={[styles.regular_context, { margin: 'auto' }]}>
                                  {getTranslation('ItemNo')}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    borderLeftWidth: 1,
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5,
                                    flexBasis: '343'
                                  }
                                ]}
                              >
                                <Text style={[styles.regular_context, { margin: 'auto' }]}>
                                  {getTranslation('Materials')}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    borderLeftWidth: 1,
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5,
                                    flexBasis: '130'
                                  }
                                ]}
                              >
                                <Text style={[styles.regular_context, { margin: 'auto' }]}>
                                  {getTranslation('Quantity')}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    borderLeftWidth: 1,
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5
                                  }
                                ]}
                              >
                                <Text style={[styles.regular_context, { margin: 'auto' }]}>
                                  {getTranslation('RealAmount')}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    borderLeftWidth: 1,
                                    borderRightWidth: 1,
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5
                                  }
                                ]}
                              >
                                <Text style={[styles.regular_context, { margin: 'auto' }]}>
                                  {getTranslation('BackAmount')}
                                </Text>
                              </View>
                            </View>
                            {/* row-header */}
                            {profile?.body2[item?.VORNR].map((product, index) => (
                              <View style={[styles.row]} wrap={false}>
                                <View
                                  style={[
                                    styles.cell,
                                    {
                                      borderLeftWidth: 1,
                                      borderTopWidth: 0.5,
                                      borderBottomWidth: 0.5,
                                      flexBasis: '60',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      alignContent: 'center'
                                    }
                                  ]}
                                >
                                  <Text style={[styles.regular_content, styles.center]}>
                                    {product?.RSPOS}
                                  </Text>
                                </View>
                                <View
                                  style={[
                                    styles.cell,
                                    {
                                      borderLeftWidth: 1,
                                      borderTopWidth: 0.5,
                                      borderBottomWidth: 0.5,
                                      flexBasis: '150'
                                    }
                                  ]}
                                >
                                  <Text
                                    style={[
                                      styles.regular_content,
                                      styles.left,
                                      { marginLeft: 1, height: 38 }
                                    ]}
                                  >
                                    {`${product?.MATNR.padEnd(18, ' ')}`}
                                  </Text>
                                </View>
                                <View
                                  style={[
                                    styles.cell,
                                    {
                                      borderTopWidth: 0.5,
                                      borderBottomWidth: 0.5,
                                      flexBasis: '5'
                                    }
                                  ]}
                                ></View>
                                <View
                                  style={[
                                    styles.cell,
                                    {
                                      borderTopWidth: 0.5,
                                      borderBottomWidth: 0.5,
                                      flexBasis: '188'
                                    }
                                  ]}
                                >
                                  <Text
                                    style={[
                                      styles.regular_content,
                                      styles.left,
                                      { marginLeft: 2, height: 38, marginRight: 2 }
                                    ]}
                                  >
                                    {`${product?.MATXT?.padEnd(15, ' ')}`}
                                  </Text>
                                </View>
                                <View
                                  style={[
                                    styles.cell,
                                    {
                                      borderLeftWidth: 1,
                                      borderTopWidth: 0.5,
                                      borderBottomWidth: 0.5,
                                      flexBasis: '130'
                                    }
                                  ]}
                                >
                                  <Text
                                    style={[
                                      styles.regular_content,
                                      styles.right,
                                      { marginRight: 2 }
                                    ]}
                                  >
                                    {numberComma(product.MENGE)}
                                    &nbsp;&nbsp;
                                    {product.EINHEIT}
                                  </Text>
                                </View>
                                <View
                                  style={[
                                    styles.cell,
                                    {
                                      borderLeftWidth: 1,
                                      borderTopWidth: 0.5,
                                      borderBottomWidth: 0.5
                                    }
                                  ]}
                                ></View>
                                <View
                                  style={[
                                    styles.cell,
                                    {
                                      borderLeftWidth: 1,
                                      borderRightWidth: 1,
                                      borderTopWidth: 0.5,
                                      borderBottomWidth: 0.5
                                    }
                                  ]}
                                ></View>
                              </View>
                            ))}
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )
          }
          return (
            <View>
              <View>
                <View style={styles.OrderTitle} wrap={false}>
                  <Text
                    style={[
                      styles.OrderCount,
                      styles.regular_content,
                      styles.left,
                      { marginLeft: 5, marginVertical: 'auto' }
                    ]}
                  >
                    {getTranslation('Order')} {Number(orderCount)}
                  </Text>
                </View>
                <View style={styles.table}>
                  <View style={[styles.row]} wrap={false}>
                    <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 0.5 }]}>
                      <Text style={[styles.regular_context, styles.topCenter]}>
                        {getTranslation('OrderType')}
                      </Text>
                      <Text style={[styles.regular_content, styles.center]}>
                        {profile?.body1[orderCount][0]?.SEQ_TXT}
                      </Text>
                    </View>
                    <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 0.5 }]}>
                      <Text style={[styles.regular_context, styles.topCenter]}>
                        {getTranslation('ReferenceOrder')}
                      </Text>
                      <Text style={[styles.regular_content, styles.center]}>
                        {profile?.body1[orderCount][0]?.BEZFL}
                      </Text>
                    </View>
                    <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 0.5 }]}>
                      <Text style={[styles.regular_context, styles.topCenter]}>
                        {getTranslation('StartWork')}
                      </Text>
                      <Text style={[styles.regular_content, styles.center]}>
                        {profile?.body1[orderCount][0]?.VORNR1 === 0
                          ? ''
                          : profile?.body1[orderCount][0]?.VORNR1}
                      </Text>
                    </View>
                    <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 0.5 }]}>
                      <Text style={[styles.regular_context, styles.topCenter]}>
                        {getTranslation('EndJob')}
                      </Text>
                      <Text style={[styles.regular_content, styles.center]}>
                        {profile?.body1[orderCount][0]?.VORNR2 === 0
                          ? ''
                          : profile?.body1[orderCount][0]?.VORNR2}
                      </Text>
                    </View>
                    <View
                      style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 0.5 }]}
                    ></View>
                    <View
                      style={[styles.cell, { borderRightWidth: 1, borderBottomWidth: 0.5 }]}
                    ></View>
                  </View>
                </View>
              </View>
              {profile?.body1[orderCount].map((item, key) => (
                <View>
                  <View style={styles.OrderItemTitle} wrap={false}>
                    <Text
                      style={[
                        styles.OrderItemText,
                        styles.regular_content,
                        styles.left,
                        { marginLeft: 5 }
                      ]}
                    >
                      {getTranslation('Operation')} {item?.VORNR} {getTranslation('Order')}{' '}
                      {Number(orderCount)}
                    </Text>
                  </View>
                  <View style={styles.table}>
                    <View style={[styles.row]} wrap={false}>
                      <View
                        style={[
                          styles.cell,
                          { borderLeftWidth: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5 }
                        ]}
                      >
                        <Text style={[styles.regular_context, styles.topCenter]}>
                          {getTranslation('WorkCenter')}
                        </Text>
                        <Text style={[styles.regular_content, { margin: 'auto' }]}>
                          {item?.ARBPL}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.cell,
                          {
                            borderLeftWidth: 1,
                            borderBottomWidth: 0.5,
                            borderTopWidth: 0.5,
                            flexBasis: '75'
                          }
                        ]}
                      >
                        <Text style={[styles.regular_context, styles.topCenter]}>
                          {getTranslation('Factory')}
                        </Text>
                        <Text style={[styles.regular_content, { margin: 'auto' }]}>
                          {item?.WERKS}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.cell,
                          {
                            borderLeftWidth: 1,
                            borderBottomWidth: 0.5,
                            borderTopWidth: 0.5,
                            flexBasis: '345'
                          }
                        ]}
                      >
                        <Text style={[styles.regular_context, styles.topCenter]}>
                          {getTranslation('Description')}
                        </Text>
                        <Text style={[styles.regular_content, styles.left, { marginLeft: 5 }]}>
                          {item?.LTXA1}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.cell,
                          { borderLeftWidth: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5 }
                        ]}
                      >
                        <Text style={[styles.regular_context, styles.topCenter]}>
                          {getTranslation('Beginning')}
                        </Text>
                        <Text style={[styles.regular_content, { margin: 'auto' }]}>
                          {item?.SSAVD?.replaceAll('-', '/')}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.cell,
                          { borderLeftWidth: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5 }
                        ]}
                      >
                        <Text style={[styles.regular_context, styles.topCenter]}>
                          {getTranslation('Finish')}
                        </Text>
                        <Text style={[styles.regular_content, { margin: 'auto' }]}>
                          {item?.SSELD?.replaceAll('-', '/')}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.cell,
                          {
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 0.5,
                            borderTopWidth: 0.5
                          }
                        ]}
                      >
                        <Text style={[styles.regular_context, styles.topCenter]}>
                          {getTranslation('ConfirmNO')}
                        </Text>
                        <Text style={[styles.regular_content, { margin: 'auto' }]}>
                          {item?.RUECK}
                        </Text>
                      </View>
                    </View>
                    {profile?.body2[item?.VORNR] && (
                      <View>
                        <View style={styles.VORNRItemTitle} wrap={false}>
                          <Text
                            style={[
                              styles.VORNRItemText,
                              styles.regular_content,
                              styles.left,
                              { marginLeft: 5 }
                            ]}
                          >
                            {getTranslation('Element')} {item?.VORNR} {getTranslation('Order')}{' '}
                            {Number(orderCount)}
                          </Text>
                        </View>
                        <View style={styles.table}>
                          {/* row-header */}
                          <View style={[styles.row]} wrap={false}>
                            <View
                              style={[
                                styles.cell,
                                {
                                  borderLeftWidth: 1,
                                  borderTopWidth: 0.5,
                                  borderBottomWidth: 0.5,
                                  flexBasis: '60'
                                }
                              ]}
                            >
                              <Text style={[styles.regular_context, { margin: 'auto' }]}>
                                {getTranslation('ItemNo')}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.cell,
                                {
                                  borderLeftWidth: 1,
                                  borderTopWidth: 0.5,
                                  borderBottomWidth: 0.5,
                                  flexBasis: '344'
                                }
                              ]}
                            >
                              <Text style={[styles.regular_context, { margin: 'auto' }]}>
                                {getTranslation('Materials')}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.cell,
                                {
                                  borderLeftWidth: 1,
                                  borderTopWidth: 0.5,
                                  borderBottomWidth: 0.5,
                                  flexBasis: '130'
                                }
                              ]}
                            >
                              <Text style={[styles.regular_context, { margin: 'auto' }]}>
                                {getTranslation('Quantity')}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.cell,
                                {
                                  borderLeftWidth: 1,
                                  borderTopWidth: 0.5,
                                  borderBottomWidth: 0.5
                                }
                              ]}
                            >
                              <Text style={[styles.regular_context, { margin: 'auto' }]}>
                                {getTranslation('RealAmount')}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.cell,
                                {
                                  borderLeftWidth: 1,
                                  borderRightWidth: 1,
                                  borderTopWidth: 0.5,
                                  borderBottomWidth: 0.5
                                }
                              ]}
                            >
                              <Text style={[styles.regular_context, { margin: 'auto' }]}>
                                {getTranslation('BackAmount')}
                              </Text>
                            </View>
                          </View>
                          {/* row-header */}
                          {profile?.body2[item?.VORNR].map((product, index) => (
                            <View style={[styles.row]} wrap={false}>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    borderLeftWidth: 1,
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5,
                                    flexBasis: '60'
                                  }
                                ]}
                              >
                                <Text style={[styles.regular_content, styles.center]}>
                                  {product?.RSPOS}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    borderLeftWidth: 1,
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5,
                                    flexBasis: '150'
                                  }
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.regular_content,
                                    styles.left,
                                    { marginLeft: 1, height: 38 }
                                  ]}
                                >
                                  {`${product?.MATNR.padEnd(18, ' ')}`}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5,
                                    flexBasis: '5'
                                  }
                                ]}
                              ></View>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    // borderLeftWidth: 1,
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5,
                                    flexBasis: '188'
                                  }
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.regular_content,
                                    styles.left,
                                    { marginLeft: 2, height: 38, marginRight: 2 }
                                  ]}
                                >
                                  {`${product?.MATXT?.padEnd(15, ' ')}`}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    borderLeftWidth: 1,
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5,
                                    flexBasis: '130'
                                  }
                                ]}
                              >
                                <Text
                                  style={[styles.regular_content, styles.right, { marginRight: 2 }]}
                                >
                                  {numberComma(product.MENGE)}
                                  &nbsp;&nbsp;
                                  {product.EINHEIT}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    borderLeftWidth: 1,
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5
                                  }
                                ]}
                              ></View>
                              <View
                                style={[
                                  styles.cell,
                                  {
                                    borderLeftWidth: 1,
                                    borderRightWidth: 1,
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5
                                  }
                                ]}
                              ></View>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )
        })}
        {/* --表身-- */}

        {/* 作業進度確認表 */}
        <View wrap={false}>
          <View style={[styles.ProgressConfirm]}>
            <Text style={[styles.VORNRItemText, styles.regular_content, styles.center]}>
              {getTranslation('ProgressConfirmationForm')}
            </Text>
          </View>
          <View style={styles.table}>
            {/* row-header */}
            <View style={[styles.row]}>
              <View
                style={[
                  styles.cell,
                  {
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    flexBasis: `${locale === 'E' ? '70' : '55'}`
                  }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>{getTranslation('Job')}</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { borderLeftWidth: 1, borderBottomWidth: 1, flexBasis: '180' }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>
                  {getTranslation('JobDescription')}
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    flexBasis: `${locale === 'E' ? '85' : '65'}`
                  }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>
                  {getTranslation('WorkCenter')}
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    flexBasis: `${locale === 'E' ? '67' : '65'}`
                  }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>
                  {getTranslation('JobOutput')}
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    flexBasis: `${locale === 'E' ? '67' : '65'}`
                  }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>
                  {getTranslation('ProductionNO')}
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    flexBasis: `${locale === 'E' ? '67' : '65'}`
                  }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>{getTranslation('DoneTime')}</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    flexBasis: `${locale === 'E' ? '67' : '65'}`
                  }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>
                  {getTranslation('MachineTime')}
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    flexBasis: `${locale === 'E' ? '67' : '65'}`
                  }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>
                  {getTranslation('ArtificialTime')}
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1 }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>
                  {getTranslation('TotalHours')}
                </Text>
              </View>
            </View>
            {/* row-header */}
            {profile.pureBody1.map(item => (
              <View style={[styles.row]}>
                <View
                  style={[
                    styles.cell,
                    {
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      flexBasis: `${locale === 'E' ? '70' : '55'}`
                    }
                  ]}
                >
                  <Text style={[styles.regular_content, { margin: 'auto' }]}>{item?.VORNR}</Text>
                </View>
                <View
                  style={[
                    styles.cell,
                    {
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      flexBasis: '180'
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.regular_content,
                      styles.left,
                      { height: 38, marginRight: 2, marginLeft: 2 }
                    ]}
                  >
                    {item?.LTXA1}
                  </Text>
                </View>
                <View
                  style={[
                    styles.cell,
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      flexBasis: `${locale === 'E' ? '85' : '65'}`
                    }
                  ]}
                >
                  <Text style={[styles.regular_content, { margin: 'auto' }]}>{item?.ARBPL}</Text>
                </View>
                <View
                  style={[
                    styles.cell,
                    {
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      flexBasis: `${locale === 'E' ? '67' : '65'}`
                    }
                  ]}
                ></View>
                <View
                  style={[
                    styles.cell,
                    {
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      flexBasis: `${locale === 'E' ? '67' : '65'}`
                    }
                  ]}
                ></View>
                <View
                  style={[
                    styles.cell,
                    {
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      flexBasis: `${locale === 'E' ? '67' : '65'}`
                    }
                  ]}
                ></View>
                <View
                  style={[
                    styles.cell,
                    {
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      flexBasis: `${locale === 'E' ? '67' : '65'}`
                    }
                  ]}
                ></View>
                <View
                  style={[
                    styles.cell,
                    {
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      flexBasis: `${locale === 'E' ? '67' : '65'}`
                    }
                  ]}
                ></View>
                <View
                  style={[
                    styles.cell,
                    { borderLeftWidth: 1, borderBottomWidth: 1, borderRightWidth: 1 }
                  ]}
                ></View>
              </View>
            ))}
          </View>
        </View>
        {/* 作業進度確認表 */}
        {/* 產出繳庫記錄表 */}
        <View wrap={false}>
          <View style={[styles.GoodReceiveLog]}>
            <Text style={[styles.VORNRItemText, styles.regular_content, styles.center]}>
              {getTranslation('GoodReceiveLog')}
            </Text>
          </View>
          <View style={styles.table}>
            {/* row-header */}
            <View style={[styles.row]}>
              <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1 }]}>
                <Text style={[styles.regular_content, styles.center]}>{getTranslation('Date')}</Text>
              </View>
              <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1 }]}>
                <Text style={[styles.regular_content, styles.center]}>{getTranslation('Time')}</Text>
              </View>
              <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1 }]}>
                <Text style={[styles.regular_content, styles.center]}>{getTranslation('GRQty')}</Text>
              </View>
              <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1 }]}>
                <Text style={[styles.regular_content, styles.center]}>{getTranslation('Operator')}</Text>
              </View>
              <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1 }]}>
                <Text style={[styles.regular_content, styles.center]}>{getTranslation('WHkeeper')}</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    flexBasis: '350',
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    borderRightWidth: 1
                  }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>{getTranslation('Remark')}</Text>
              </View>
            </View>
            {/* row-header */}
            {[0, 1, 2].map(() => (
              <View style={[styles.row]}>
                <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1 }]}>
                  <Text style={[styles.regular_content, styles.center]}>
                    {`
                     
                     `}
                  </Text>
                </View>
                <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1 }]}>
                  <Text style={[styles.regular_content, styles.center]}>
                    {`
                     
                     `}
                  </Text>
                </View>
                <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1 }]}>
                  <Text style={[styles.regular_content, styles.center]}>
                    {`
                     
                     `}
                  </Text>
                </View>
                <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1 }]}>
                  <Text style={[styles.regular_content, styles.center]}>
                    {`
                     
                     `}
                  </Text>
                </View>
                <View style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1 }]}>
                  <Text style={[styles.regular_content, styles.center]}>
                    {`
                     
                     `}
                  </Text>
                </View>
                <View
                  style={[
                    styles.cell,
                    {
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      flexBasis: '350'
                    }
                  ]}
                >
                  <Text style={[styles.regular_content, styles.center]}>
                    {`
                     
                     `}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* 產出繳庫記錄表 */}
        {/* 物料異動文件號碼 */}
        <View wrap={false}>
          <View style={[styles.MaterialDocNo]}>
            <Text style={[styles.VORNRItemText, styles.regular_content, styles.center]}>
              {getTranslation('MaterialDocNo')}
            </Text>
          </View>
          <View style={styles.table}>
            <View style={[styles.row]}>
              <View
                style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1, flexBasis: '35' }]}
              >
                <Text style={[styles.regular_content, { margin: 'auto' }]}>
                  {getTranslation('Issue')}
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    flexBasis: '414'
                  }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>
                  {`
                    
                    `}
                </Text>
              </View>
            </View>
            <View style={[styles.row]}>
              <View
                style={[styles.cell, { borderLeftWidth: 1, borderBottomWidth: 1, flexBasis: '35' }]}
              >
                <Text style={[styles.regular_content, { margin: 'auto' }]}>
                  {getTranslation('Receive')}
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    flexBasis: '414'
                  }
                ]}
              >
                <Text style={[styles.regular_content, styles.center]}>
                  {`
                    
                    `}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* 物料異動文件號碼 */}
        <Text style={styles.footerUser} fixed>
          {getTranslation('User')}: fakeUser
        </Text>
        <Text style={styles.footerTime} fixed>
          {getTranslation('Date')}: {moment().format('YYYY/MM/DD HH:mm')}
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${getTranslation('Page')}: ${pageNumber}/${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
    // </PDFViewer>
  )
}

Font.registerHyphenationCallback(word => {
  if (word.length === 1) {
    return [word]
  }

  return Array.from(word)
    .map(char => [char, ''])
    .reduce((arr, current) => {
      arr.push(...current)
      return arr
    }, [])
})

Font.register({
  family: 'Microsoft JhengHei',
  fonts: [
    {
      src: JhengHei,
      fontWeight: 400
    },
    {
      src: JhengHeiBold,
      fontWeight: 400
    }
  ]
})

const styles = StyleSheet.create({
  body: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 23
  },
  completeCheck: {
    position: 'absolute',
    width: 90,
    height: 30,
    right: 65,
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'stretch',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  completeCheckbox: {
    width: 14,
    height: 14,
    border: 1
  },
  completeText: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Microsoft JhengHei'
  },
  header: {
    marginBottom: 197
  },
  // 總寬 500+50
  logoBorder: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: 110,
    height: 76,
    borderTop: 1,
    borderRight: 1,
    borderLeft: 1,
    borderColor: 'black',
    textAlign: 'center'
  },
  logo: {
    width: '80%',
    height: '90%',
    margin: '3 auto 0'
  },
  large_context: {
    fontFamily: 'Microsoft JhengHei',
    fontSize: 16
  },
  regular_context: {
    fontFamily: 'Microsoft JhengHei',
    fontSize: 8
  },
  topCenter: {
    top: 1,
    textAlign: 'center'
  },
  topLeft: {
    top: 1,
    left: 1
  },
  large_content: {
    fontFamily: 'Microsoft JhengHei',
    fontSize: 14
  },
  regular_content: {
    fontFamily: 'Microsoft JhengHei',
    fontSize: 9
  },
  left: {
    textAlign: 'left'
  },
  center: {
    textAlign: 'center'
  },
  right: {
    textAlign: 'right'
  },
  PRT: {
    position: 'absolute',
    top: 20,
    left: 110,
    width: 220,
    height: 40,
    borderTop: 1,
    borderColor: 'black'
  },
  PRT_context: {
    textAlign: 'center',
    fontWeight: 'bold',
    top: 1
  },
  PLNBEZ: {
    position: 'absolute',
    top: 20,
    right: 0,
    width: 220,
    height: 40,
    borderTop: 1,
    borderRight: 1,
    borderLeft: 1,
    borderColor: 'black'
  },
  MAT_STXT: {
    position: 'absolute',
    top: 60,
    left: 110,
    width: 220,
    height: 37,
    borderTop: 1,
    borderColor: 'black'
  },
  AUFNR: {
    position: 'absolute',
    top: 60,
    right: 110,
    width: 110,
    height: 37,
    borderTop: 1,
    borderLeft: 1,
    borderColor: 'black'
  },
  GMEIN: {
    position: 'absolute',
    top: 60,
    right: 0,
    width: 110,
    height: 37,
    borderTop: 1,
    borderLeft: 1,
    borderRight: 1,
    borderColor: 'black'
  },
  DISPO: {
    position: 'absolute',
    top: 96,
    left: 0,
    width: 110,
    height: 48,
    borderTop: 1,
    borderLeft: 1,
    borderColor: 'black'
  },
  FEVOR: {
    position: 'absolute',
    top: 96,
    left: 109,
    width: 111,
    height: 48,
    borderTop: 1,
    borderLeft: 1,
    borderColor: 'black'
  },
  AUART: {
    position: 'absolute',
    top: 96,
    left: 220,
    width: 110,
    height: 48,
    borderTop: 1,
    borderLeft: 1,
    borderColor: 'black'
  },
  GSTRS: {
    position: 'absolute',
    top: 96,
    right: 110,
    width: 110,
    height: 48,
    borderTop: 1,
    borderLeft: 1,
    borderColor: 'black'
  },
  GLTRS: {
    position: 'absolute',
    top: 96,
    right: 0,
    width: 110,
    height: 48,
    borderTop: 1,
    borderLeft: 1,
    borderRight: 1,
    borderColor: 'black'
  },
  STTXT: {
    position: 'absolute',
    top: 143,
    left: 0,
    width: 220,
    height: 48,
    borderTop: 1,
    borderLeft: 1,
    borderBottom: 1,
    borderColor: 'black'
  },
  WERKS: {
    position: 'absolute',
    top: 143,
    left: 220,
    width: 110,
    height: 48,
    borderTop: 1,
    borderLeft: 1,
    borderBottom: 1,
    borderColor: 'black'
  },
  RSNUM: {
    position: 'absolute',
    top: 143,
    right: 110,
    width: 110,
    height: 48,
    borderTop: 1,
    borderLeft: 1,
    borderBottom: 1,
    borderColor: 'black'
  },
  ERDAT: {
    position: 'absolute',
    top: 143,
    right: 0,
    width: 110,
    height: 48,
    borderTop: 1,
    borderLeft: 1,
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'black'
  },
  AUFNRBarCode: {
    position: 'absolute',
    top: 190,
    left: 0,
    width: 275,
    height: 66,
    borderLeft: 1,
    borderColor: 'black'
  },
  AUFNRBarCode_content: {
    width: '85%',
    height: '85%',
    margin: '10 auto'
  },
  AUFNRBarCode_content_Img: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  PLNBEZBarCode: {
    position: 'absolute',
    top: 190,
    right: 0,
    width: 275,
    height: 66,
    borderLeft: 1,
    borderRight: 1,
    borderColor: 'black'
  },
  PLNBEZBarCode_content: {
    width: '85%',
    height: '85%',
    margin: '10 auto'
  },
  PLNBEZBarCode_content_Img: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  ROUT_STXT: {
    position: 'absolute',
    top: 255,
    left: 0,
    width: 549.5,
    height: 28,
    border: 1,
    borderColor: 'black'
  },
  OrderTitle: {
    width: 549.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    height: 19,
    borderColor: 'black',
    backgroundColor: '#AEAEAE'
  },
  OrderTitleText: {
    marginVertical: 'auto'
  },
  OrderItemTitle: {
    width: 549.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    height: 19,
    borderColor: 'black',
    backgroundColor: '#D3D3D3'
  },
  OrderItemText: {
    marginVertical: 'auto'
  },
  VORNRItemTitle: {
    width: 549.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    height: 19,
    borderColor: 'black',
    backgroundColor: '#E5E4E2'
  },
  VORNRItemText: {
    marginVertical: 'auto'
  },
  ProgressConfirm: {
    width: 549.5,
    border: 1,
    height: 19,
    borderColor: 'black',
    backgroundColor: '#E5E4E2',
    marginTop: 8
  },
  GoodReceiveLog: {
    width: 549.5,
    border: 1,
    height: 19,
    borderColor: 'black',
    backgroundColor: '#E5E4E2',
    marginTop: 5
  },
  MaterialDocNo: {
    width: 549.5,
    border: 1,
    height: 19,
    borderColor: 'black',
    backgroundColor: '#E5E4E2',
    marginTop: 5
  },
  table: {
    fontSize: 10,
    width: 549.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    flexWrap: 'nowrap',
    alignItems: 'stretch'
  },
  row: {
    pageBreakInside: 'avoid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'stretch',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    flexGrow: 0,
    flexShrink: 0
    // flexBasis: 'auto',
  },
  cell: {
    pageBreakInside: 'avoid',
    padding: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '86',
    // flexBasis: 'auto',
    alignSelf: 'stretch'
  },
  footerUser: {
    position: 'absolute',
    fontSize: 10,
    bottom: 13,
    left: 80,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Microsoft JhengHei'
  },
  footerTime: {
    position: 'absolute',
    fontSize: 10,
    bottom: 13,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Microsoft JhengHei'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 13,
    right: 100,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Microsoft JhengHei'
  }
})

export default PrintContent
