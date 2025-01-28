using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SeriHaberlesme
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        private void COMPortlariListele()
        {
            string[] myPort;

            myPort = System.IO.Ports.SerialPort.GetPortNames();
            comboBoxCOMPorts.Items.AddRange(myPort);
        }
        MySqlConnection conn;

        private void Form1_Load(object sender, EventArgs e)
        {

            COMPortlariListele();
            conn = new MySqlConnection("Server=localhost;Database=wireless_project_db;Uid=root;Pwd='';");

            try
            {
                conn.Open();
                if (conn.State != System.Data.ConnectionState.Closed)
                {
                    MessageBox.Show("Bağlantı Başarılı Bir Şekilde Gerçekleşti");
                }
                else
                {
                    MessageBox.Show("Maalesef Bağlantı Yapılamadı...!");
                }
            }
            catch (Exception err)
            {
                MessageBox.Show("Hata! " + err.Message, "Hata Oluştu", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        string nem = "";
        string isi = "";
        string mesafe = "";
        string hava = "";

        public void dht11()
        {
            MySqlCommand comm = conn.CreateCommand();
            comm.CommandText = "INSERT INTO dht11(date, heat, humidity,device_id) VALUES (@date,@heat, @humidity, @device)";
            comm.Parameters.AddWithValue("@heat", isi);
            comm.Parameters.AddWithValue("@humidity", nem);
            comm.Parameters.AddWithValue("@date", DateTime.Now);
            comm.Parameters.AddWithValue("@device", "1");
            comm.ExecuteNonQuery();
        }
        public void mq135()
        {
            MySqlCommand comm = conn.CreateCommand();
            comm.CommandText = "INSERT INTO mq135( air_quality_value,device_id,date) VALUES (@air, @device2,@date2)";
            comm.Parameters.AddWithValue("@air", hava);
            comm.Parameters.AddWithValue("@device2", "1");
            comm.Parameters.AddWithValue("@date2", DateTime.Now);
            comm.ExecuteNonQuery();
        }

        public void hcsr04()
        {
            MySqlCommand comm = conn.CreateCommand();
            comm.CommandText = "INSERT INTO hcsr04_awake_log( triggered_date,device_id) VALUES (@trdate, @device3)";
            comm.Parameters.AddWithValue("@device3", "1");
            comm.Parameters.AddWithValue("@trdate", DateTime.Now);
            comm.ExecuteNonQuery();
        }

        public void GelenVerileriGuncelle(string veri)
        {
            MySqlCommand comm = conn.CreateCommand();

            if (this.textBoxGelenVeri.InvokeRequired)
            {
                GelenVerileriGuncelle(veri);
            }
            else
            {

                this.textBoxGelenVeri.AppendText(veri);

                string[] splitted = veri.Split(',');

                nem = splitted[1];
                isi = splitted[0];
                hava = splitted[2];
                mesafe = splitted[3];

                if (conn.State != ConnectionState.Open)
                {
                    conn.Open();
                    dht11();
                    mq135();

                    int msf = Convert.ToInt32(mesafe);

                    if (msf >= 2 && msf <= 25)
                    {
                        hcsr04();
                    }
                }
                else
                {
                    conn.Close();
                }
            }
        }


        private void buttonSerialPortBaglanti_Click(object sender, EventArgs e)
        {
            if (comboBoxCOMPorts.SelectedIndex < 0)
            {
                MessageBox.Show("COM port bulunamadi");
                return;
            }

            if (comboBoxSerialPortBaudRate.SelectedIndex < 0)
            {
                MessageBox.Show("Bağlantı hızı seçiniz");
                return;
            }

            try
            {
                if (serialPort1.IsOpen == false)
                {
                    serialPort1.PortName = comboBoxCOMPorts.SelectedItem.ToString();
                    serialPort1.BaudRate = Convert.ToInt32(comboBoxSerialPortBaudRate.Text);
                    serialPort1.Open();
                    buttonSerialPortBaglanti.Text = "BAĞLANTI KES";
                }
                else
                {

                    serialPort1.Close();
                    buttonSerialPortBaglanti.Text = "BAĞLANTI AÇ";
                }
            }
            catch
            {
                MessageBox.Show("Bağlantı açılamadı!");
            }
        }


        private void serialPort1_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            GelenVerileriGuncelle(serialPort1.ReadExisting());
        }
    }
}

